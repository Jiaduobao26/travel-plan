import axios from 'axios';
const base = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api';

export async function getAttractions(payload) {
    const res = await fetch("/mock/attractions.json").then(r => r.json());
    return res;
}

export async function getTripPlan(payload) {
    const res = await axios.post(`${base}/itinerary`, payload);
    return res
}