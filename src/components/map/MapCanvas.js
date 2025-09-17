import { GoogleMap } from "@react-google-maps/api";
const STYLE = { width: "100%", height: "calc(100vh - 64px - 140px)" };
const DEFAULT_CENTER = { lat: 37.7749, lng: -122.4194 };

export default function MapCanvas({ onLoad, children }) {
  return (
    <GoogleMap
      onLoad={(map) => { map.setOptions({ clickableIcons: false }); onLoad(map); }}
      mapContainerStyle={STYLE}
      center={DEFAULT_CENTER}
      zoom={12}
    >
      {children}
    </GoogleMap>
  );
}
