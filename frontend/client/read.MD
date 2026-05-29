# คู่มือการใช้งานเว็บระบบจัดการสินค้าและออเดอร์

เว็บนี้เป็น frontend ที่สร้างด้วย React + Vite สำหรับจัดการสินค้า ออเดอร์ ใบสั่งทำ และโปรไฟล์ผู้ส่ง โดยเชื่อมต่อกับ .NET backend ผ่าน REST API

## การเปิดใช้งาน

1. ติดตั้ง dependencies

```bash
npm install
```

2. เปิด backend ก่อน และตรวจสอบว่า API ทำงานอยู่

ค่าเริ่มต้นของ frontend จะเรียก backend ที่:

```text
http://localhost:5020
```

ถ้าต้องการเปลี่ยน URL backend ให้สร้างไฟล์ `.env` แล้วกำหนดค่า:

```env
VITE_API_BASE_URL=http://localhost:5020
```

3. เปิด frontend

```bash
npm run dev
```

4. ตรวจสอบ production build

```bash
npm run build
```

5. ตรวจสอบคุณภาพโค้ด

```bash
npm run lint
```

## ภาพรวมหน้าเว็บ

หน้าเว็บหลักอยู่ที่ `src/App.jsx` และแบ่งเมนูเป็น 4 หน้า

| เมนู | หน้าที่ |
| --- | --- |
| สินค้า | เพิ่มสินค้า ดูรายการสินค้า และลบสินค้า |
| ออเดอร์ | สร้างออเดอร์จากสินค้า และอัปเดตข้อมูลจัดส่ง |
| ใบสั่งทำ | สร้างใบสั่งทำ อัปเดตสถานะ อัปเดตจัดส่ง และลบใบสั่งทำ |
| ผู้ส่ง | เพิ่มโปรไฟล์ผู้ส่ง ตั้งค่าเริ่มต้น และลบผู้ส่ง |

ด้านบนของเว็บมีส่วนสรุปภาพรวม ได้แก่ จำนวนสินค้า จำนวนสต็อก ออเดอร์รอส่ง และงานสั่งทำที่รอดำเนินการ

## วิธีใช้งานแต่ละหน้า

### 1. หน้า สินค้า

ใช้สำหรับจัดการข้อมูลสินค้าในคลัง

ขั้นตอนเพิ่มสินค้า:

1. กรอก `SKU`
2. กรอก `ชื่อสินค้า`
3. กรอก `ราคา`
4. กรอก `น้ำหนัก`
5. กรอก `จำนวนสต็อก`
6. กด `บันทึกสินค้า`

การลบสินค้า:

1. กดปุ่ม `ลบ` ในรายการสินค้า
2. ระบบจะแสดงกล่อง `ยืนยันการลบสินค้านี้หรือไม่?`
3. กดตกลงเพื่อยืนยัน หรือยกเลิกเพื่อไม่ลบ

### 2. หน้า ออเดอร์

ใช้สำหรับสร้างออเดอร์จากสินค้าที่มีอยู่ และบันทึกข้อมูลจัดส่ง

ข้อควรรู้:

- ต้องมีโปรไฟล์ผู้ส่งเริ่มต้นก่อน จึงจะสร้างออเดอร์ได้
- สินค้าใน dropdown มาจากรายการสินค้าที่โหลดจาก backend

ขั้นตอนสร้างออเดอร์:

1. เลือกสินค้า
2. กรอกจำนวน
3. กรอกค่าส่ง
4. กรอกชื่อผู้รับ
5. กรอกเบอร์ผู้รับ
6. กรอกที่อยู่ผู้รับ
7. กด `สร้างออเดอร์`

ขั้นตอนอัปเดตการจัดส่ง:

1. กรอกชื่อขนส่ง
2. กรอกเลขพัสดุ
3. กด `บันทึกจัดส่ง`

### 3. หน้า ใบสั่งทำ

ใช้สำหรับจัดการงานสั่งทำพิเศษ เช่น งานแกะสลักหรืองานตามคำขอเฉพาะ

ขั้นตอนสร้างใบสั่งทำ:

1. กรอกประเภทสินค้า
2. กรอกข้อความแกะสลัก ถ้ามี
3. กรอก URL รูปอ้างอิง ถ้ามี
4. กรอกราคาประเมิน
5. กรอกเงินมัดจำ ถ้ามี
6. กรอกชื่อผู้รับ
7. กรอกเบอร์ผู้รับ
8. กรอกวิธีจัดส่ง
9. เลือกวันกำหนดส่ง ถ้ามี
10. กรอกคำขอเพิ่มเติม ถ้ามี
11. กรอกที่อยู่ผู้รับ
12. กด `สร้างใบสั่งทำ`

สถานะใบสั่งทำที่รองรับ:

```text
Pending
InProgress
Completed
Shipped
Cancelled
```

การลบใบสั่งทำ:

1. กดปุ่ม `ลบ`
2. ระบบจะแสดงกล่อง `ยืนยันการลบใบสั่งทำนี้หรือไม่?`
3. กดตกลงเพื่อยืนยัน หรือยกเลิกเพื่อไม่ลบ

### 4. หน้า ผู้ส่ง

ใช้สำหรับจัดการข้อมูลผู้ส่ง ซึ่งจำเป็นต่อการสร้างออเดอร์

ขั้นตอนเพิ่มโปรไฟล์ผู้ส่ง:

1. กรอกชื่อผู้ส่ง
2. กรอกเบอร์โทร
3. กรอกที่อยู่
4. เลือก `ตั้งเป็นผู้ส่งเริ่มต้น` ถ้าต้องการ
5. กด `บันทึกผู้ส่ง`

การตั้งค่าเริ่มต้น:

1. กด `ตั้งเป็นค่าเริ่มต้น` ที่โปรไฟล์ผู้ส่ง
2. ระบบจะบันทึกโปรไฟล์นั้นเป็นผู้ส่งหลัก

การลบผู้ส่ง:

1. กดปุ่ม `ลบ`
2. ระบบจะแสดงกล่อง `ยืนยันการลบโปรไฟล์ผู้ส่งนี้หรือไม่?`
3. กดตกลงเพื่อยืนยัน หรือยกเลิกเพื่อไม่ลบ

## โครงสร้างเว็บ

```text
src/
  App.jsx
  main.jsx
  index.css
  assets/
    hero.png
  components/
    common.jsx
  pages/
    ProductsPage.jsx
    OrdersPage.jsx
    CustomOrdersPage.jsx
    SenderProfilesPage.jsx
  services/
    api.js
  utils/
    formatters.js
```

รายละเอียดแต่ละส่วน:

| ไฟล์/โฟลเดอร์ | หน้าที่ |
| --- | --- |
| `src/main.jsx` | จุดเริ่มต้นของ React ใช้ render `App` เข้า DOM |
| `src/App.jsx` | คุม state หลัก โหลดข้อมูลจาก backend และส่ง props ไปแต่ละหน้า |
| `src/index.css` | CSS ทั้งหมดของหน้าเว็บ |
| `src/assets/hero.png` | รูปพื้นหลังส่วนหัวของเว็บ |
| `src/components/common.jsx` | component ใช้ซ้ำ เช่น `DataPanel`, `TextInput`, `TextArea`, `StatusPill` |
| `src/pages/ProductsPage.jsx` | หน้าจัดการสินค้า |
| `src/pages/OrdersPage.jsx` | หน้าจัดการออเดอร์ |
| `src/pages/CustomOrdersPage.jsx` | หน้าจัดการใบสั่งทำ |
| `src/pages/SenderProfilesPage.jsx` | หน้าจัดการโปรไฟล์ผู้ส่ง |
| `src/services/api.js` | ฟังก์ชันกลางสำหรับเรียก backend API |
| `src/utils/formatters.js` | helper สำหรับ format ข้อมูล เช่น format เงินไทย |

## หลักการทำงานของเว็บ

### 1. โหลดข้อมูลจาก backend

เมื่อเปิดหน้าเว็บ `App.jsx` จะเรียก `loadAll()` เพื่อโหลดข้อมูลพร้อมกันจาก 4 endpoint:

```text
GET /api/Products
GET /api/Orders
GET /api/CustomOrders
GET /api/SenderProfiles
```

ข้อมูลที่ได้จะถูกเก็บไว้ใน state:

```text
products
orders
customOrders
senders
```

### 2. เลือกหน้าโดยใช้ state

เว็บไม่ได้ใช้ React Router แต่ใช้ state ชื่อ `activeTab` เพื่อเลือกว่าจะแสดงหน้าไหน

```text
products      -> ProductsPage
orders        -> OrdersPage
customOrders  -> CustomOrdersPage
senders       -> SenderProfilesPage
```

เมื่อกดเมนูด้านบน ค่า `activeTab` จะเปลี่ยน และ `ActivePage` จะเลือก component ที่ต้องแสดง

### 3. ส่งข้อมูลและฟังก์ชันลงหน้าแยก

`App.jsx` เป็นตัวเก็บข้อมูลและฟังก์ชัน action หลัก เช่น เพิ่มสินค้า ลบสินค้า สร้างออเดอร์ แล้วส่งต่อให้ไฟล์ใน `src/pages/` ผ่าน props

ตัวอย่าง:

```text
App.jsx
  -> ProductsPage.jsx
      -> แสดง form เพิ่มสินค้า
      -> แสดงตารางสินค้า
      -> เรียก onSubmitProduct
      -> เรียก onDeleteProduct
```

### 4. เรียก API ผ่าน service กลาง

ทุก request จะผ่าน `apiRequest()` ใน `src/services/api.js`

ข้อดี:

- ตั้งค่า backend base URL ไว้ที่เดียว
- แปลง response เป็น JSON ที่เดียว
- จัดการ error message กลางที่เดียว

### 5. หลังทำรายการสำเร็จจะโหลดข้อมูลใหม่

ทุก action หลักจะถูกห่อด้วย `runAction()`

ลำดับการทำงาน:

1. เรียก API
2. ถ้าสำเร็จ แสดงข้อความสำเร็จ
3. เรียก `loadAll()` เพื่อโหลดข้อมูลล่าสุด
4. ถ้าล้มเหลว แสดงข้อความ error

### 6. การยืนยันก่อนลบ

ก่อนลบข้อมูล ระบบใช้ `window.confirm()` เพื่อให้ผู้ใช้ยืนยันก่อนส่งคำสั่งลบจริง

รายการที่มีการยืนยันก่อนลบ:

- สินค้า
- ใบสั่งทำ
- โปรไฟล์ผู้ส่ง

## API ที่ frontend เรียกใช้

### Products

```text
GET    /api/Products
POST   /api/Products
DELETE /api/Products/:id
```

### Orders

```text
GET /api/Orders
POST /api/Orders
PUT /api/Orders/:id/update-shipping
```

### Custom Orders

```text
GET    /api/CustomOrders
POST   /api/CustomOrders
PUT    /api/CustomOrders/:id/update-status
PUT    /api/CustomOrders/:id/update-shipping
DELETE /api/CustomOrders/:id
```

### Sender Profiles

```text
GET    /api/SenderProfiles
POST   /api/SenderProfiles
PUT    /api/SenderProfiles/:id
DELETE /api/SenderProfiles/:id
```

## การแก้ไขเพิ่มเติมในอนาคต

ถ้าต้องการเพิ่มหน้าใหม่:

1. สร้างไฟล์ใหม่ใน `src/pages/`
2. เพิ่มรายการเมนูใน `navigationItems` ที่ `src/App.jsx`
3. เพิ่มเงื่อนไขใน `ActivePage`
4. ถ้าต้องเรียก API ใหม่ ให้เพิ่มการเรียกผ่าน `apiRequest()`

ถ้าต้องการเพิ่ม component ใช้ซ้ำ:

1. เพิ่ม component ใน `src/components/common.jsx`
2. import ไปใช้ในหน้าที่ต้องการ

ถ้าต้องการเพิ่ม helper:

1. เพิ่มไฟล์หรือฟังก์ชันใน `src/utils/`
2. import ไปใช้เฉพาะจุดที่ต้องการ
