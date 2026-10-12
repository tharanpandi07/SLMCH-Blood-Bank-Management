const API = "/api";

export async function api(path, options = {}) {
  const token = localStorage.getItem("bb_token");
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(API + path, { ...options, headers });
  const data = await response.json().catch(() => ({}));

  if (response.status === 401) {
    localStorage.removeItem("bb_token");
    localStorage.removeItem("bb_user");
  }

  if (!response.ok) {
    throw new Error(data.error || `Request failed (${response.status})`);
  }

  return data;
}

export const groups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
