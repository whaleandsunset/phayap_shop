import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 

interface UserRecord { id: number; fname: string; lname: string; fullName: string; birthDate: string; age: number; address: string; }

interface UserForm { firstName: string; lastName: string; birthDate: string; address: string; }

type ModalMode = 'add' | 'view' | null;

@Component({
  selector: 'app-user-management',
  imports: [FormsModule],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css',
})
export class UserManagement {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router); 
  private readonly apiUrl = 'http://localhost:5020/api/users';

  protected readonly users = signal<UserRecord[]>([]);
  protected readonly isLoading = signal(true);
  protected readonly isSaving = signal(false);
  protected readonly errorMessage = signal('');
  protected readonly modalMode = signal<ModalMode>(null);
  protected readonly selectedUser = signal<UserRecord | null>(null);
  protected readonly form = signal<UserForm>({
    firstName: '',
    lastName: '',
    birthDate: '',
    address: '',
  });

  protected readonly calculatedAge = computed(() => {
    const birthDate = this.form().birthDate;
    return birthDate ? this.calculateAge(birthDate) : 0;
  });

  protected readonly isFormValid = computed(() => {
    const form = this.form();
    return Boolean(
      form.firstName.trim() && form.lastName.trim() && form.birthDate && form.address.trim(),
    );
  });

  constructor() {
    this.loadUsers();
  }

  
  protected goToHome(): void {
    this.router.navigate(['/']);
  }

  protected openAddModal(): void {
    this.errorMessage.set('');
    this.form.set({
      firstName: '',
      lastName: '',
      birthDate: '',
      address: '',
    });
    this.modalMode.set('add');
  }

  protected openViewModal(user: UserRecord): void {
    this.selectedUser.set(user);
    this.modalMode.set('view');
  }

  protected closeModal(): void {
    if (this.isSaving()) {
      return;
    }

    this.modalMode.set(null);
    this.selectedUser.set(null);
  }

  protected updateForm(field: keyof UserForm, value: string): void {
    this.form.update((current) => ({
      ...current,
      [field]: value,
    }));
  }

  protected saveUser(): void {
    if (!this.isFormValid() || this.isSaving()) {
      return;
    }

    const form = this.form();
    
    const payload = {
      fname: form.firstName.trim(),    
      lname: form.lastName.trim(),     
      birthDate: form.birthDate,       
      address: form.address.trim(),
    };

    this.isSaving.set(true);
    this.errorMessage.set('');

    this.http.post<unknown>(this.apiUrl, payload).subscribe({
      next: (response) => {
        const user = this.toUserRecord(response, this.nextId(), payload);
        this.users.update((users) => [...users, user]);
        this.isSaving.set(false);
        this.closeModal();
      },
      error: () => {
        this.errorMessage.set('บันทึกข้อมูลไม่สำเร็จ กรุณาตรวจสอบการเชื่อมต่อ Backend');
        this.isSaving.set(false);
      },
    });
  }

  protected formatDate(dateValue: string): string {
    if (!dateValue) {
      return '-';
    }

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) {
      return dateValue;
    }

    return new Intl.DateTimeFormat('th-TH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  }

  private loadUsers(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.http.get<unknown>(this.apiUrl).subscribe({
      next: (response) => {
        const records = Array.isArray(response)
          ? response
          : Array.isArray((response as { data?: unknown[] })?.data)
            ? (response as { data: unknown[] }).data
            : [];

        this.users.set(records.map((item, index) => this.toUserRecord(item, index + 1)));
        this.isLoading.set(false);
      },
      error: () => {
        this.users.set([]);
        this.errorMessage.set('ไม่สามารถดึงข้อมูลจาก Backend ได้ กรุณาตรวจสอบ endpoint /api/users');
        this.isLoading.set(false);
      },
    });
  }

  private toUserRecord(
    source: unknown,
    fallbackId: number,
    fallback?: Partial<UserRecord>,
  ): UserRecord {
    const record = (source ?? {}) as Record<string, unknown>;
    const birthDate = String(
      record['birthDate'] ??
        record['birthday'] ??
        record['dateOfBirth'] ??
        fallback?.birthDate ??
        '',
    );

    const fname = String(record['fname'] ?? fallback?.fname ?? '');
    const lname = String(record['lname'] ?? fallback?.lname ?? '');
    const fullName = String(record['fullName'] ?? `${fname} ${lname}`.trim());

    return {
      id: Number(record['id'] ?? fallbackId),
      fname,      
      lname,      
      fullName,
      birthDate,
      age: Number(record['age'] ?? fallback?.age ?? this.calculateAge(birthDate)),
      address: String(record['address'] ?? fallback?.address ?? ''),
    };
  }

  private calculateAge(birthDate: string): number {
    const year = new Date(birthDate).getFullYear();

    if (Number.isNaN(year)) {
      return 0;
    }

    return new Date().getFullYear() - year;
  }

  private nextId(): number {
    return this.users().reduce((maxId, user) => Math.max(maxId, user.id), 0) + 1;
  }
}