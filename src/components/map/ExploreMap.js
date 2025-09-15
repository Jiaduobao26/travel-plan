import { useRef, useState } from "react";
import { useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import useMapMarkers from "./useMapMarkers";
import usePlacesSearch from "./usePlacesSearch";
import MapCanvas from "./MapCanvas";
import MapControls from "./controls/MapControls";
import TravelSetupDialog from "../TravelSetupDialog";
import { zoomMapToPlace } from "../../utils/predictionLevel";
import { dedupPlaces } from "../../utils/placeUtils";
import { attractionIcon } from "../../assets";

const LIBRARIES = ["places"];

export default function ExploreMap() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_MAPS_BROWSER_KEY,
        libraries: LIBRARIES,
    });

    const mapRef = useRef(null);
    const inputRef = useRef(null);
    const pickedLocRef = useRef(null);

    const [picked, setPicked] = useState("");
    const [destination, setDestination] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const { markers, selected, setSelected, addFromPlace, clearMarkers, fitToPlaces } = useMapMarkers(mapRef);
    const { textSearch } = usePlacesSearch(mapRef);

    const onMapLoad = (map) => (mapRef.current = map);

    // === 选点 ===
    const handlePick = (place) => {
        setDestination({ name: place?.name || "", place_id: place?.place_id || "" });
        const label = place?.formatted_address || place?.name || "";
        if (label) setPicked(label);

        if (place?.geometry?.location && mapRef.current) {
            pickedLocRef.current = place.geometry.location;
            mapRef.current.panTo({
                lat: place.geometry.location.lat(), lng: place.geometry.location.lng()
            });
            clearMarkers();
            addFromPlace(place);
            zoomMapToPlace(mapRef.current, place);
        }
        setOpenDialog(true);
    };

    // === 对话框确认（批量落点）===
    const handleConfirmDialog = ({ attractions }) => {
        clearMarkers();
        const unique = dedupPlaces(attractions);
        unique.forEach((p, i) => addFromPlace({ ...p, geometry: { location: p.location } }, i));
        setOpenDialog(false);
    };

    // === 搜 20 个 attractions ===
    const search20 = () => {
        const center = pickedLocRef.current || mapRef.current?.getCenter?.();
        const label = picked || inputRef.current?.value || "";
        textSearch({ query: label ? `tourist attractions in ${label}` : "tourist attractions", location: center }, (list) => {
            clearMarkers();
            const unique = dedupPlaces(list).slice(0, 20);
            unique.forEach((p, i) => addFromPlace(p, i));
            fitToPlaces(list);
        });
    };

    if (!isLoaded) return <div style={{ padding: 16 }}>Loading map…</div>;

    return (
        <div style={{ padding: 0 }}>
            <MapControls
                picked={picked}
                onPick={handlePick}
                onStart={() => setOpenDialog(true)}
                onSearch20={search20}
                inputRef={inputRef}
                dialogSlot={
                    <TravelSetupDialog
                        destination={destination}
                        open={openDialog}
                        onClose={() => setOpenDialog(false)}
                        title={`Trip to ${picked}`}
                        onConfirm={handleConfirmDialog}
                    />
                }
            />

            <MapCanvas onLoad={onMapLoad}>
                {markers.map((m) => (
                    <Marker
                        key={m.id}
                        position={m.position}
                        onClick={() => setSelected(m.place)}
                        icon={{ url: attractionIcon, scaledSize: new window.google.maps.Size(32, 32) }}
                    />
                ))}

                {selected && (
                    <InfoWindow
                        position={{
                            lat: typeof selected.geometry.location.lat === "function" ? selected.geometry.location.lat() : selected.geometry.location.lat,
                            lng: typeof selected.geometry.location.lng === "function" ? selected.geometry.location.lng() : selected.geometry.location.lng,
                        }}
                        onCloseClick={() => setSelected(null)}
                    >
                        <div style={{ fontFamily: "system-ui, -apple-system, Arial", maxWidth: 240 }}>
                            <div style={{ fontWeight: 600, marginBottom: 4 }}>{selected.name || ""}</div>
                            {selected.formatted_address || selected.vicinity ? (
                                <div style={{ color: "#555", marginBottom: 4 }}>
                                    {selected.formatted_address || selected.vicinity}
                                </div>
                            ) : null}
                            {selected.rating != null ? (
                                <div style={{ color: "#111" }}>
                                    ⭐ {selected.rating} ({selected.user_ratings_total || 0})
                                </div>
                            ) : null}
                        </div>
                    </InfoWindow>
                )}
            </MapCanvas>
        </div>
    );
}
