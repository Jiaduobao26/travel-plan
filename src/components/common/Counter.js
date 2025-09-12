// Counter.jsx
import React from "react";
import { Stack, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Counter({
  value,
  onChange,
  min = 0,
  max = 16,
  size = "small",
}) {
  const handleDec = () => {
    if (value > min) onChange(value - 1);
  };

  const handleInc = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <IconButton
        onClick={handleDec}
        disabled={value <= min}
        size={size}
        sx={{ border: 1, borderColor: "divider" }}
      >
        <RemoveIcon />
      </IconButton>

      <Typography variant="h6" sx={{ width: 24, textAlign: "center" }}>
        {value}
      </Typography>

      <IconButton
        onClick={handleInc}
        disabled={value >= max}
        size={size}
        sx={{ border: 1, borderColor: "divider" }}
      >
        <AddIcon />
      </IconButton>
    </Stack>
  );
}
