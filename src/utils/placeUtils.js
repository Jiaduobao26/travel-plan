export function dedupPlaces(list) {
  const seen = new Set();
  const out = [];
  for (const p of list || []) {
    const loc = p.geometry?.location;
    const lat = typeof loc?.lat === "function" ? loc.lat() : loc?.lat;
    const lng = typeof loc?.lng === "function" ? loc.lng() : loc?.lng;

    const key = p.place_id || (lat != null && lng != null ? `${lat.toFixed(6)},${lng.toFixed(6)}` : null);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(p);
  }
  return out;
}
