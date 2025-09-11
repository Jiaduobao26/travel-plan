import React, { useEffect, useState } from "react";
import { signInWithGoogle, watchAuth, logout } from "./lib/auth";
import MapPage from "./components/MapPage";
import UserProfile from "./components/UserProfile";

export default function App() {
  const [user, setUser] = useState(null);

  // 初次渲染时：组件完成挂载，DOM 已经插入页面后，useEffect 回调才会被执行
  // 依赖数组 []：表示只在挂载时执行一次，不会在之后 re-render 时再次执行
  // 返回的清理函数 return () => un()：会在组件卸载（unmount）时执行，用来清理订阅、事件监听等副作用
  useEffect(() => { // 只执行一次初始化逻辑 （挂载后）
    const un = watchAuth(setUser);
    return () => un();
  }, []);

  return (
    <div>
      <header style={{ display: "flex", gap: 12, padding: 12, alignItems: "center" }}>
        <h3 style={{ margin: 0, flex: 1 }}>Maps + Firebase Demo</h3>
        {user ? (
          <>
            <UserProfile uid={user.uid} />
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
