import React, { useEffect, useState } from "react";
import { signInWithGoogle, watchAuth, logout } from "./lib/auth";
import MapPage from "./components/MapPage";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const un = watchAuth(setUser);
    return () => un();
  }, []);

  return (
    <div>
      <header style={{ display: "flex", gap: 12, padding: 12, alignItems: "center" }}>
        <h3 style={{ margin: 0, flex: 1 }}>Maps + Firebase Demo</h3>
        {user ? (
          <>
            <span>{user.displayName || user.email}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        )}
      </header>
      <MapPage />
    </div>
  );
}
