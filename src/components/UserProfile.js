// src/components/UserProfile.js
import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
/**
 * 展示 Firestore /users/{uid} 的资料
 * 用 onSnapshot 保持实时更新（比如 lastLoginAt/role 变化）
 */
export default function UserProfile({ uid }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!uid) return;

    const ref = doc(db, "users", uid);
    const un = onSnapshot(
      ref,
      (snap) => setProfile(snap.exists() ? snap.data() : null),
      (err) => console.error("[SNAP ERROR]", err)
    );
    return () => un();
  }, [uid]);

  if (!uid) return null;
  if (!profile) return <span>Loading…</span>;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {profile.avatar ? (
        <img
          src={profile.avatar}
          alt="avatar"
          width={32}
          height={32}
          style={{ borderRadius: "50%" }}
        />
      ) : null}
      <span>
        {profile.name || profile.email || uid}
      </span>
    </div>
  );
}
