import { useCallback } from "react";

export default function usePlacesSearch(mapRef) {
  const textSearch = useCallback(({ query, location, limit = 20 }, onDone) => {
    if (!mapRef.current || !window.google?.maps?.places) return onDone([]);
    const svc = new window.google.maps.places.PlacesService(mapRef.current);
    const results = [];
    const req = { query, location, type: "tourist_attraction" };
    const OK = window.google.maps.places.PlacesServiceStatus.OK;

    function handle(r, status, pagination) {
      if (status === OK && r) {
        results.push(...r);
        if (pagination?.hasNextPage && results.length < limit) {
          pagination.nextPage(); return;
        }
      }
      onDone(results.slice(0, limit));
    }
    svc.textSearch(req, handle);
  }, [mapRef]);

  return { textSearch };
}
