import React, { useEffect, useState } from "react";
import { watchAuth } from "./lib/auth";
import ExploreMap from "./components/map/ExploreMap";
import Header from './components/Header';
// import Toolbar from '@mui/material/Toolbar';
import { Box } from "@mui/material";

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
    <Box sx={{ height: "100vh", overflow: "hidden", display: "flex", alignItems: "end" }}>
      <Header user={user} />
      {/* <Toolbar /> */}
      <ExploreMap sx={{height: 'calc(100vh - 64px)', overflow: "hidden" }}/>
    </Box>
  );
}
