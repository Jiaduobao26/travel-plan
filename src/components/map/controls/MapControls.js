import Box from "@mui/material/Box";
import SmallButton from "../../common/SmallButton";
import PlacesAutocomplete from "../../PlacesAutocomplete";

export default function MapControls({ picked, onPick, onStart, onSearch20, inputRef, dialogSlot }) {
  return (
    <>
      <Box display="flex" alignItems="center" gap={1} mb={1.5}>
        <PlacesAutocomplete onSelect={onPick} inputRef={inputRef} />
        {picked || ''}
        {picked ? dialogSlot : null}
      </Box>

      <Box display="flex" gap={1} mb={1}>
        <SmallButton disabled={!picked} variant="outlined" size="small" onClick={onStart}>
          Start planning
        </SmallButton>
        <SmallButton variant="contained" size="small" onClick={onSearch20}>
          Search nearby 20 attractions
        </SmallButton>
      </Box>
    </>
  );
}
