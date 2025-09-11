import React, { useEffect, useRef, useState } from "react";
import { auth } from "../lib/firebase";
import { Button, Input } from '@mui/material';
import PlacesAutocomplete from "./PlacesAutocomplete";
import { zoomMapToPlace } from '../utils/predictionLevel';
// import { styled } from '@mui/material/styles';
import attractionIcon from "../assets/round-pushpin.png";
function loadMaps(key) {
  return new Promise((resolve) => {
    if (window.google && window.google.maps) return resolve();
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
    s.async = true;
    s.onload = () => resolve();
    document.body.appendChild(s);
  });
}

export default function MapPage() {
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const mapObj = useRef(null);

  const [picked, setPicked] = useState(""); // 选中点的文本，用于 query
  const pickedLocRef = useRef(null); // 选中点坐标
  const infoRef = useRef(null); // 复用一个 InfoWindow
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const handlePick = (placePrediction) => {
    console.log("用户选择了：", placePrediction);
    const place = placePrediction;
    const label = place?.formatted_address || place?.name || "";
    if (label) setPicked(label);
    if (place?.geometry?.location) {
      pickedLocRef.current = place.geometry.location;
      mapObj.current.panTo(place.geometry.location);
      const mk = makeMarker(place); // 用统一方法创建，可点开信息窗
      window.__markers = window.__markers || [];
      window.__markers.forEach((m) => m.setMap(null));
      window.__markers.push(mk);
    }
    zoomMapToPlace(mapObj.current, place);
  };

  useEffect(() => {
    (async () => {
      await loadMaps(process.env.REACT_APP_MAPS_BROWSER_KEY);

      mapObj.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 12,
      });
      infoRef.current = new window.google.maps.InfoWindow();
      if (!showAutoComplete) {
        setShowAutoComplete(true);
      }
    })();

  }, [showAutoComplete]);

  async function fetchNearby() {
    const user = auth.currentUser;
    if (!user) return alert("请先登录");
    const idToken = await user.getIdToken();

    const center = mapObj.current.getCenter();
    const lat = center.lat();
    const lng = center.lng();

    const url = `http://localhost:4000/api/places/nearby?lat=${lat}&lng=${lng}&type=restaurant`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${idToken}` } });
    const data = await res.json();

    if (Array.isArray(data.results)) {
      if (!window.__markers) window.__markers = [];
      window.__markers.forEach((m) => m.setMap(null));
      window.__markers = [];

      data.results.slice(0, 20).forEach((p) => {
        if (p.geometry?.location) {
          const marker = new window.google.maps.Marker({
            position: { lat: p.geometry.location.lat, lng: p.geometry.location.lng },
            map: mapObj.current,
            title: p.name,
          });
          window.__markers.push(marker);
        }
      });
    } else {
      alert("后端返回异常");
    }
  }

  // Text Search — 基于选的点做语义+位置偏置搜索 20 个“tourist attractions”
  function searchAttractionsText() {
    if (!mapObj.current) return;

    const center = pickedLocRef.current || mapObj.current.getCenter();
    const label = picked || inputRef.current?.value || ""; // 优先用选中的区域文本
    console.log({
      label
    })
    const service = new window.google.maps.places.PlacesService(mapObj.current);
    const results = [];

    const request = {
      query: label ? `tourist attractions in ${label}` : "tourist attractions",
      location: center,
      // radius: 20000, // 20km；城市可命中较全，州/国家仅作偏置
      type: "tourist_attraction"
    };

    const handle = (r, status, pagination) => {
      const OK = window.google.maps.places.PlacesServiceStatus.OK;
      if (status !== OK || !r) {
        alert("Search failed or no results");
        return;
      }
      results.push(...r);
      if (pagination && pagination.hasNextPage && results.length < 20) {
        pagination.nextPage(); // SDK 内置节流
        return;
      }

      // 清理并渲染最多 20 个
      if (!window.__markers) window.__markers = [];
      window.__markers.forEach((m) => m.setMap(null));
      window.__markers = [];

      results.slice(0, 20).forEach((p) => {
        const mk = makeMarker(p);
        if (mk) window.__markers.push(mk);
      });

      // 自动缩放以包含所有点（可选）
      if (results.length) {
        const bounds = new window.google.maps.LatLngBounds();
        results.slice(0, 20).forEach((p) => p.geometry?.location && bounds.extend(p.geometry.location));
        mapObj.current.fitBounds(bounds);
      }
    };

    service.textSearch(request, handle);
  }
  function infoHtml(p) {
    const name = p.name || "";
    const addr = p.formatted_address || p.vicinity || "";
    const rating = (p.rating != null) ? `⭐ ${p.rating} (${p.user_ratings_total || 0})` : "";
    return `
      <div style="font-family: system-ui, -apple-system, Arial; max-width: 240px;">
        <div style="font-weight:600; margin-bottom:4px;">${name}</div>
        ${addr ? `<div style="color:#555; margin-bottom:4px;">${addr}</div>` : ``}
        ${rating ? `<div style="color:#111;">${rating}</div>` : ``}
      </div>`;
  }

  function makeMarker(p) {
    if (!p?.geometry?.location) return null;
    const marker = new window.google.maps.Marker({
      position: p.geometry.location,
      map: mapObj.current,
      title: p.name,
      icon: {
        url: attractionIcon,
        scaledSize: new window.google.maps.Size(32, 32), // 调整大小
      },
    });
    marker.addListener("click", () => {
      // 打开统一的 InfoWindow
      infoRef.current.setContent(infoHtml(p));
      infoRef.current.open({ anchor: marker, map: mapObj.current });
    });
    return marker;
  }



  return (
    <div style={{ padding: 16 }}>
      {showAutoComplete && <PlacesAutocomplete onSelect={handlePick} />}
      {picked && (
        <div style={{ margin: "6px 0", fontSize: 14 }}>
          You want to go: <strong>{picked}</strong>
        </div>
      )}
      <Button variant="outlined" onClick={fetchNearby}>附近餐馆（后端代理）</Button>
      <Button variant="contained" onClick={searchAttractionsText}>Search nearby 20 attractions</Button>
      <div ref={mapRef} style={{ width: "100%", height: 650, marginTop: 8 }} />
    </div>
  );
}
