import { Box, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import SmallButton from "../common/SmallButton";
import { budgetOptions } from './travelSetupOptions';

function TravelBudget({ onPrev, onNext, budget, onChange }) {
    // 渲染标签的辅助函数
    const renderLabel = (option) => {
        if (!option.icon) {
            return option.label;
        }

        return (
            <Box display="flex" alignItems="center">
                {option.icon}
                <Box sx={{ marginLeft: 1 }}>
                    {option.label}
                </Box>
            </Box>
        );
    };
    return <>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <RadioGroup value={budget}
                onChange={(e) => onChange(e.target.value)}>
                {budgetOptions.map((option) => (
                    <FormControlLabel
                        key={option.id}
                        value={option.value}
                        control={<Radio />}
                        label={renderLabel(option)}
                    />
                ))}
            </RadioGroup>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <SmallButton variant="outlined" onClick={onPrev}>
                Prev
            </SmallButton>
            <SmallButton variant="outlined" onClick={onNext}>
                Next
            </SmallButton>
        </Box>
    </>;

}
export default TravelBudget;