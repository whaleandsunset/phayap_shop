export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5020";

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  const text = await response.text();
  let data;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { message: text || "Backend ส่งข้อมูลกลับมาในรูปแบบที่ frontend อ่านไม่ได้" };
  }

  if (!response.ok) {
    throw new Error(data?.message || data?.error || "ไม่สามารถเชื่อมต่อ backend ได้");
  }

  return data;
}
