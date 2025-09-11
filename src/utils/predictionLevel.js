export function levelFromPrediction(pred) {
  if (!pred) return 'unknown';
  const t = new Set(pred.types || []);
  if (t.has('country')) return 'country';
  if (t.has('administrative_area_level_1')) return 'state';
  if (t.has('administrative_area_level_2')) return 'county';
  if (t.has('locality') || t.has('postal_town')) return 'city';
  if (t.has('sublocality')) return 'district';
  if (t.has('neighborhood')) return 'neighborhood';
  if (t.has('postal_code')) return 'zip';
  return 'unknown';
}

export function levelLabel(level) {
  const map = {
    country: 'Country',
    state: 'State',
    county: 'County',
    city: 'City',
    district: 'District',
    neighborhood: 'Neighborhood',
    zip: 'ZIP',
    unknown: ''
  };
  return map[level] || '';
}

// 各层级建议的缩放
export const ZOOM_BY_LEVEL = {
  country: 4,
  state: 6,
  county: 8,
  city: 11,
  district: 13,
  neighborhood: 14,
  street: 16,
  poi: 16,
  zip: 11,
  unknown: 12,
};
// 缩放到地点：优先用 viewport，没有则按层级映射
export function zoomMapToPlace(map, place, padding = 40) {
  const geom = place?.geometry;

  if (geom?.viewport) {
    // viewport 是 LatLngBounds，更精确（国家/州/城市尤其好用）
    map.fitBounds(geom.viewport, padding);
    return;
  }

  if (geom?.location) {
    const level = levelFromPrediction(place);
    const zoom = ZOOM_BY_LEVEL[level] ?? ZOOM_BY_LEVEL.unknown;
    map.setCenter({ lat: geom.location.lat(), lng: geom.location.lng() });
    map.setZoom(zoom);
  }
}