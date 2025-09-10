import React, { useEffect, useRef } from "react";
// import { auth } from "../lib/firebase";

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

  useEffect(() => {
    const run = async () => {
      await loadMaps(process.env.REACT_APP_MAPS_BROWSER_KEY);

      mapObj.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 12,
      });

      const ac = new window.google.maps.places.Autocomplete(inputRef.current);
      ac.addListener("place_changed", () => {
        const place = ac.getPlace();
        if (place.geometry && place.geometry.location) {
          mapObj.current.panTo(place.geometry.location);
          new window.google.maps.Marker({
            position: place.geometry.location,
            map: mapObj.current,
          });
        }
      });
    };
    run();
  }, []);

//   async function fetchNearby() {
//     const user = auth.currentUser;
//     if (!user) return alert("请先登录");
//     const idToken = await user.getIdToken();
//     const url = `http://localhost:4000/api/places/nearby?lat=37.7749&lng=-122.4194&type=restaurant`;
//     const res = await fetch(url, { headers: { Authorization: `Bearer ${idToken}` } });
//     const data = await res.json();
//     if (Array.isArray(data.results)) {
//       data.results.slice(0, 10).forEach((p) => {
//         if (p.geometry && p.geometry.location) {
//           new window.google.maps.Marker({
//             position: {
//               lat: p.geometry.location.lat,
//               lng: p.geometry.location.lng,
//             },
//             map: mapObj.current,
//             title: p.name,
//           });
//         }
//       });
//     } else {
//       alert("后端返回异常");
//     }
//   }

  return (
    <div style={{ padding: 16 }}>
      {/* <input ref={inputRef} placeholder="Search places…" style={{ width: 320, marginBottom: 8 }} /> */}
      {/* <button onClick={fetchNearby}>附近餐馆（后端代理）</button> */}
      <div ref={mapRef} style={{ width: "100%", height: 800, marginTop: 8 }} />
    </div>
  );
}
