import { auth } from "./firebase";

export async function callBackend() {
  const token = await auth.currentUser.getIdToken();   // 拿到 ID Token
  const res = await fetch("http://localhost:4000/api/secure-data", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
