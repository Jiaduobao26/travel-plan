import axios from 'axios';
import { auth } from "../lib/firebase";

const base = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: base,
});

// 添加请求拦截器
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        // 尝试强制刷新 token 再重试一次
        const user = auth.currentUser;
        if (user) {
          const newToken = await user.getIdToken(true);
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return api.request(error.config); // 重新请求
        }
      } catch (e) {
        console.error("Token 刷新失败，登出用户");
        await auth.signOut();
        // 跳转指定页面
      }
    }
    return Promise.reject(error);
  }
);

export async function getAttractions(payload) {
    const res = await api.post(`${base}/attractions_mock`, payload);
    // const res = await fetch("/mock/attractions.json").then(r => r.json());
    return res;
}

export async function getTripPlan(payload) {
    const res = await api.post(`${base}/itinerary`, payload);
    return res;
}