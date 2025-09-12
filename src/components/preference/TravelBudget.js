import React, { useState } from 'react';
import { Box, Radio, RadioGroup, FormControlLabel } from '@mui/material';
function TravaelBudget() {
    const [radioValue, setRadioValue] = useState('option1');
    return <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <RadioGroup
            value={radioValue}
            onChange={(e) => setRadioValue(e.target.value)}
        >

            <FormControlLabel value="option1" control={<Radio />} label="Any budget" />
            <FormControlLabel value="option2" control={<Radio />} label={
                <Box display="flex" alignItems="center">
                    💰
                    <Box sx={{ marginLeft: 1 }}>
                        On a budget
                    </Box>
                </Box>
            } />
            <FormControlLabel value="option3" control={<Radio />} label={
                <Box display="flex" alignItems="center">
                    💰💰
                    <Box sx={{ marginLeft: 1 }}>
                        Sensibly priced
                    </Box>
                </Box>
            } />
            <FormControlLabel value="option4" control={<Radio />} label={
                <Box display="flex" alignItems="center">
                    💰💰💰
                    <Box sx={{ marginLeft: 1 }}>Upscale</Box>
                </Box>
            } />
            <FormControlLabel value="option5" control={<Radio />} label={
                <Box display="flex" alignItems="center">
                    💰💰💰💰
                    <Box sx={{ marginLeft: 1 }}>Luxury</Box>
                </Box>
            } />
        </RadioGroup>
    </Box>;
}
export default TravaelBudget;