import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import Counter from '../common/Counter';
function Treavelers({
    adults = 1,
    children = 0,
    infants = 0,
    pets = 0,
    onAdultsChange,
    onChildrenChange,
    onInfantsChange,
    onPetsChange
}) {
    return (
        <Box sx={{ display: "flex", flexDirection: 'column', justifyContent: "center", px: 10 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Box>
                    <Typography variant="body1">Adults</Typography>
                    <Typography variant="body2" color="text.secondary">Ages 13 or above</Typography>
                </Box>

                <Counter label="Adults" value={adults} onChange={onAdultsChange} min={1} max={16} />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Box>
                    <Typography variant="body1">Children</Typography>
                    <Typography variant="body2" color="text.secondary">Ages 2–12</Typography>
                </Box>
                <Counter label="Children" value={children} onChange={onChildrenChange} min={0} max={16} />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Box>
                    <Typography variant="body1">Infants</Typography>
                    <Typography variant="body2" color="text.secondary">Under 2</Typography>
                </Box>
                <Counter label="Infants" value={infants} onChange={onInfantsChange} min={0} max={16} />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                    <Typography variant="body1">Pets</Typography>
                    <Tooltip
                        title="A service animal is not considered a pet, so you don’t need to include it here."
                        arrow
                    >
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ cursor: "help" }}
                        >
                            Bringing a service animal?
                        </Typography>
                    </Tooltip>
                    {/* <Typography variant="body2" color="text.secondary">Bringing a service animal?</Typography> */}
                </Box>
                <Counter label="Pets" value={pets} min={0} onChange={onPetsChange} max={4} />
            </Box>
        </Box>
    );
}

export default Treavelers;