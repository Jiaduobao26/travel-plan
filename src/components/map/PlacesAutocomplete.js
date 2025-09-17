import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Chip, TextField, Autocomplete } from "@mui/material";
import { levelFromPrediction, levelLabel } from "../../utils/predictionLevel";

/** 轻量防抖 */
function useDebounced(fn, delay = 250) {
    const fnRef = useRef(fn);
    fnRef.current = fn;
    const timer = useRef();
    return useMemo(() => (...args) => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => fnRef.current(...args), delay);
    }, [delay]);
}

/**
 *  地点自动补全（Google Places）
 * Props:
 * - onSelect(placeDetail)  // 选中后返回包含 geometry.location 的详情
 * - placeholder
 * - fields: Places Details 需要的字段（默认够用）
 * - types / componentRestrictions / locationBias: 预测控制
 * - minLength: 触发预测的最小长度（默认 2）
 * - debounceMs: 输入防抖毫秒
 * - sx / size / variant: 传给 MUI
 */
export default function PlacesAutocomplete({
    onSelect,
    placeholder = "Where to?",
    fields = ["geometry", "name", "place_id", "formatted_address", "editorial_summary", "types", "address_components"],
    // 效果不好，不用
    // types = ["(regions)"], // e.g. ["(cities)"] | ["geocode"] | ["establishment"]
    // componentRestrictions = { country: ["us", "ca", 'cn', 'jp'] }, // e.g. { country: "us" }
    // locationBias, // e.g. { radius: 50000, center: { lat: 37.7749, lng: -122.4194 } }
    // 新：主类型白/黑名单（严格过滤）
    includedPrimaryTypes = ["locality", "administrative_area_level_1", "country"],
    excludedPrimaryTypes = [
        "administrative_area_level_2",  // District/County
        "administrative_area_level_3",
        "postal_code"
    ],
    // 新：区域限制（大写国家码）
    includedRegionCodes = ["US", "CA", "CN", "JP"],
    // 仍可用地理偏置/限制
    locationBias,               // { radius, center }
    locationRestriction,        // { north, south, east, west } 更严格
    minLength = 2,
    debounceMs = 250,
    size = "small",
    variant = "outlined",
    sx,
    mapRef,
}) {
    const [input, setInput] = useState("");
    const [options, setOptions] = useState([]);
    const [ready, setReady] = useState(false);

    const serviceRef = useRef(null);            // AutocompleteService
    const placesServiceRef = useRef(null);      // PlacesService
    const sessionTokenRef = useRef(null);       // Session token for billing/quality

 // 初始化 Google 服务
  useEffect(() => {
    const g = window.google;
    if (!g?.maps?.places) return;

    // 预测服务
    serviceRef.current = new g.maps.places.AutocompleteService();

    // 详情服务需要传一个 map 或 div：
    // - 优先用 mapRef.current（更贴合地图上下文）
    // - 否则创建离屏 div
    const host =
      mapRef?.current?.getDiv?.() ??
      mapRef?.current ??
      document.createElement("div");
    placesServiceRef.current = new g.maps.places.PlacesService(host);

    // 每次新一轮输入用新 token；选中后也换一枚
    sessionTokenRef.current = new g.maps.places.AutocompleteSessionToken();
    setReady(true);
  }, [mapRef]);

    // 拉预测（防抖）
    const requestPredictions = useDebounced((text) => {
        if (!serviceRef.current || text.trim().length < minLength) {
            setOptions([]);
            return;
        }
        const req = {
            input: text,
            sessionToken: sessionTokenRef.current,
            includedPrimaryTypes,
            excludedPrimaryTypes,
            includedRegionCodes,   // 必须是大写两位码
        };
        if (locationBias) req.locationBias = locationBias;
        if (locationRestriction) req.locationRestriction = locationRestriction;
        serviceRef.current.getPlacePredictions(req, (preds) => setOptions(preds || []));
    }, debounceMs);

    useEffect(() => {
        requestPredictions(input);
    }, [input, requestPredictions]);

    // 取详情
    const fetchDetails = (place_id) =>
        new Promise((resolve, reject) => {
            if (!placesServiceRef.current) return reject(new Error("PlacesService not ready"));
            placesServiceRef.current.getDetails(
                {
                    placeId: place_id,
                    fields,
                    sessionToken: sessionTokenRef.current,
                },
                (place, status) => {
                    const g = window.google;
                    if (status === g.maps.places.PlacesServiceStatus.OK && place) {
                        resolve(place);
                    } else {
                        reject(new Error(`getDetails failed: ${status}`));
                    }
                }
            );
        });

    return (
        <Autocomplete
            disabled={!ready}
            freeSolo
            options={options}
            filterOptions={(p) => {
                return p.filter((x) => (x.types.includes("country") ||
                    x.types.includes("administrative_area_level_1") ||
                    x.types.includes("administrative_area_level_2") ||
                    x.types.includes("locality") || x.types.includes("postal_town")));
            }}
            getOptionLabel={(o) => (typeof o === "string" ? o : o.description)}
            onInputChange={(_, v) => setInput(v)}
            onChange={async (_, val) => {
                if (!val?.place_id) return;
                try {
                    const detail = await fetchDetails(val.place_id);
                    // 用完换 token，开始新的会话
                    sessionTokenRef.current = new window.google.maps.places.AutocompleteSessionToken();
                    onSelect?.(detail);
                } catch (e) {
                    console.error(e);
                }
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder={placeholder}
                    size={size}
                    variant={variant}
                />
            )}
            renderOption={(props, option) => {
                const level = levelFromPrediction(option);
                const label = levelLabel(level);
                return (
                    <li {...props} key={option.place_id}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                            <span aria-hidden>📍</span>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Box sx={{ fontWeight: 700, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {option.structured_formatting.main_text}
                                </Box>
                                <Box sx={{ fontSize: 12, opacity: 0.75, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {option.structured_formatting.secondary_text}
                                </Box>
                            </Box>

                            {label && (
                                <Chip
                                    label={label}
                                    size="small"
                                    sx={{
                                        bgcolor: '#F1F2F6',   // 浅灰底
                                        color: '#1F2937',     // 深灰字
                                        fontWeight: 700,
                                        borderRadius: '12px',
                                        px: 0.5
                                    }}
                                />
                            )}
                        </Box>
                    </li>
                )
            }}
            sx={{
                width: 360,
                "& .MuiAutocomplete-paper": {
                    borderRadius: 10,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                },
                ...sx,
            }}
        />
    );
}
