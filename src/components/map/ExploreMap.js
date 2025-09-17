import { useEffect, useRef, useState } from "react";
import { useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import useMapMarkers from "./useMapMarkers";
import MapCanvas from "./MapCanvas";
import MapControls from "./controls/MapControls";
import TravelSetupDialog from "../TravelSetupDialog";
import { zoomMapToPlace } from "../../utils/predictionLevel";
import { dedupPlaces } from "../../utils/placeUtils";
import { markerIcon } from "../../assets";
import { Box, Typography } from "@mui/material";
import AttractionCard from '../attraction/AttractionCard';

const LIBRARIES = ["places"];
const DEFAULT_CENTER = { lat: 37.7749, lng: -122.4194 };

export default function ExploreMap() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_MAPS_BROWSER_KEY,
        libraries: LIBRARIES,
    });

    const mapRef = useRef(null);
    const inputRef = useRef(null);
    const pickedLocRef = useRef(null);

    const [openDialog, setOpenDialog] = useState(false);
    const [destination, setDestination] = useState(null);
    const [attractions, setAttractions] = useState([]);

    // 添加地图宽度状态
    const [mapWidth, setMapWidth] = useState("100%");

    const { markers, selected, setSelected, addFromPlace, clearMarkers } = useMapMarkers(mapRef);

    const onMapLoad = (map) => (mapRef.current = map);

    // === 选点 ===
    const handlePick = (place) => {
        setDestination({ name: place?.name || "", place_id: place?.place_id || "" });
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

    const handleClearPicked = () => {
        setDestination(null);
        setSelected(null);
        pickedLocRef.current = null;
        clearMarkers();

        // 切换回 100% 宽度
        setMapWidth("100%");
    };

    // === 对话框确认（批量落点）===
    const handleConfirmDialog = ({ attractions }) => {

        setOpenDialog(false);

        // 切换到 60% 宽度
        setMapWidth("60%");

        clearMarkers();
        const unique = dedupPlaces(attractions).map((value, index) => {
            return { ...value, marker_id: index + 1 }
        });
        setAttractions(unique);
        unique.forEach((p, i) => addFromPlace({ ...p, geometry: { location: p.location } }, i));
    };

    // 处理地图容器宽度变化时的 resize
    useEffect(() => {
        if (!isLoaded || !mapRef.current || !window.google) return;

        const map = mapRef.current;

        // 延迟执行 resize，确保 CSS 过渡完成
        const timer = setTimeout(() => {
            if (map && window.google.maps.event) {
                window.google.maps.event.trigger(map, "resize");
            }

            // 如果切换回 100%，重置地图到默认状态
            if (mapWidth === "100%" && !destination) {
                map.setCenter(DEFAULT_CENTER);
                map.setZoom(12);
            }
        }, 300); // 等待 CSS 过渡动画完成

        return () => clearTimeout(timer);
    }, [mapWidth, isLoaded, destination]);

    if (!isLoaded) return <div style={{ padding: 16 }}>Loading map…</div>;

    return (
        <Box style={{ padding: 0, width: "100%" }}>
            <MapControls
                sx={{ height: 130 }}
                picked={destination?.name}
                onClear={handleClearPicked}
                onPick={handlePick}
                openDialog={() => setOpenDialog(true)}
                inputRef={inputRef}
                dialogSlot={
                    <TravelSetupDialog
                        destination={destination}
                        open={openDialog}
                        onClose={() => setOpenDialog(false)}
                        title={`Trip to ${destination?.name}`}
                        onConfirm={handleConfirmDialog}
                    />
                }
            />
            <Box sx={{ display: "flex", minHeight: 620, height: 'calc(100vh - 64px - 130px)', overflow: "hidden" }}>
                <Box
                    style={{
                        width: mapWidth,
                        transition: "width 280ms ease-in-out",
                        flexShrink: 0
                    }}
                >
                    <MapCanvas onLoad={onMapLoad}>
                        {markers.map((m) => {
                            console.log(String(m?.place?.marker_id || ''))
                            return (

                                <Marker
                                    key={m.id}
                                    position={m.position}
                                    onClick={() => setSelected(m.place)}
                                    label={{
                                        text: String(m.place?.marker_id || ' '),  // 显示编号(不能是空字符串)
                                        color: "white",
                                        fontSize: "14px",
                                        fontWeight: "bold"
                                    }}
                                    icon={{
                                        url: markerIcon,
                                        scaledSize: new window.google.maps.Size(32, 32),
                                        labelOrigin: new window.google.maps.Point(16, 12) 
                                    }}
                                />
                            )
                        })}

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
                </Box>
                {mapWidth === "60%" && (

                    <Box sx={{

                        display: "flex",
                        flexDirection: 'column',
                        flex: 1,
                        px: 4
                    }}>
                        <Box sx={{ flexShrink: 0, mb: 2, borderBottom: '1px solid #333' }}>
                            <Typography variant="h6" fontWeight="bold">Attractions</Typography>
                        </Box>
                        <Box sx={{
                            pb: 10,
                            flex: 1, overflow: 'scroll',
                            "&::-webkit-scrollbar": {
                                display: "none", // Chrome / Safari
                            },
                        }}>
                            {
                                attractions?.map((attraction) => {
                                    return (<Box mb={2} key={attraction.marker_id}>
                                        <AttractionCard
                                            className="AttractionCard"
                                            sx={{ mb: 2 }}
                                            image="https://images.squarespace-cdn.com/content/v1/5c7f5f60797f746a7d769cab/1708063049157-NMFAB7KBRBY2IG2BWP4E/the+golden+gate+bridge+san+francisco.jpg"
                                            title={attraction.name}
                                            category={attraction.category}
                                            time="9:30 AM - 10:30 AM"
                                            id={attraction.marker_id}
                                        />
                                    </Box>)
                                })
                            }
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
