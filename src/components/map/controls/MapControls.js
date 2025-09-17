import { Box, Container, Typography, Tooltip, IconButton } from "@mui/material";
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import PlacesAutocomplete from "../PlacesAutocomplete";

export default function MapControls({ picked, onPick, onClear, openDialog, inputRef, dialogSlot, mapRef = null }) {
  const clearPickedHandler = () => {
    onClear && onClear();
  }
  return (
    <>
      <Container maxWidth="md" sx={{ textAlign: "center", pt: 1, mb: 1 }}>
        {!picked ? <>
          <Typography variant="h3" fontWeight={800} gutterBottom>
            Where do you want to go?
          </Typography>
          <Typography color="text.secondary">
            Pick one place. We'll take it from there.
          </Typography>

          <Box
            sx={{ display: "flex", justifyContent: "center" }}
            mt={1}
            gap={1}
            mb={2}>
            <PlacesAutocomplete onSelect={onPick} inputRef={inputRef} mapRef={mapRef} />
          </Box>
        </>
          :
          <Box  sx={{ textAlign: "center", pt: 1, mb: 5 }}>
            <Typography variant="h3" fontWeight={800} gutterBottom>
              Trip to {picked}
              <Tooltip title="Change destination" sx={{ ml: 3}}>
                <IconButton size="large" onClick={clearPickedHandler} aria-label="Change destination" color="primary">
                  <EditLocationAltIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Change trip settings" sx={{ ml: 1}}>
                <IconButton size="large" onClick={openDialog} aria-label="Change trip settings" color="primary">
                  <EditDocumentIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </Typography>
            {dialogSlot}
          </Box>
        }
      </Container>
    </>
  );
}
