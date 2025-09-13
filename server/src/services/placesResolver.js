import { Client } from "@googlemaps/google-maps-services-js";

const mapsClient = new Client({});

export async function resolvePlaceIds({ destination, attractions }) {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) throw new Error("Missing GOOGLE_MAPS_API_KEY");

  // 给每个 attraction.name 做一次 textSearch（可做并发 & 限速）
  const results = [];
  for (const item of attractions) {
    const query = `${item.name}, ${destination}`;
    try {
      const resp = await mapsClient.textSearch({
        params: {
          query,
          key,
          // 可选：region/ language 等
          // region: "us",
          // language: "en",
        },
      });
      const top = resp?.data?.results?.[0];
      results.push({
        ...item,
        place_id: top?.place_id || null,
        // 也可回传经纬度/地址：方便直接在地图渲染
        location: top?.geometry?.location || null,
        formatted_address: top?.formatted_address || null,
        rating: top?.rating ?? null,
        user_ratings_total: top?.user_ratings_total ?? null,
      });
    } catch (e) {
      results.push({ ...item, place_id: null });
    }
  }
  return results;
}
