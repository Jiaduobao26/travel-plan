import {
    Box,
    Typography,
    Checkbox,
    FormControlLabel,
    FormGroup,
} from '@mui/material';
import SmallButton from "../common/SmallButton";
import { travelStyles, transportationOptions } from './travelSetupOptions'

const TravelPreferences = ({ onPrev, onNext, onChange, preferences }) => {
    // 处理多选变化
    const handleCheckboxChange = (category, option) => {
        onChange(prev => {
            const newPrefs = { ...prev };

            if (newPrefs[category].some((o) => o.id === option.id)) {
                newPrefs[category] = newPrefs[category].filter(item => item.id !== option.id);
            } else {
                newPrefs[category] = [...newPrefs[category], option];
            }

            return newPrefs;
        });
    };

    // 渲染选项组
    const renderCheckboxGroup = (title, options, category) => (
        <>
            <Typography variant="body1" sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                {title}
            </Typography>
            <FormGroup row sx={{ flexWrap: 'wrap' }}>
                {options.map((option) => (
                    <Box key={option.id} sx={{ width: '45%' }}>
                        <FormControlLabel
                            key={option.id}
                            control={
                                <Checkbox
                                    size="small"
                                    checked={preferences[category].some((o) => o.id === option.id)}
                                    onChange={() => handleCheckboxChange(category, option)}
                                />
                            }
                            label={
                                <Box display="flex" alignItems="center" gap={1}>
                                    <span>{option.icon}</span>
                                    <span>{option.label}</span>
                                </Box>
                            }
                        />
                    </Box>
                ))}
            </FormGroup>
        </>
    );

    return (
        <Box sx={{ mx: 'auto' }}>
            {/* 旅行风格 */}
            {renderCheckboxGroup(
                "What's your travel style?",
                travelStyles,
                "travelStyle"
            )}

            {/* 交通方式 */}
            {renderCheckboxGroup(
                "How do you prefer to get around?",
                transportationOptions,
                "transportation"
            )}

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <SmallButton variant="outlined" onClick={onPrev}>
                    Prev
                </SmallButton>
                <SmallButton variant="outlined" onClick={onNext}>
                    Next
                </SmallButton>
            </Box>
        </Box>
    );
};

export default TravelPreferences;