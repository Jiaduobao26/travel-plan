import { useMemo } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Typography, Grid } from '@mui/material';
import SmallButton from "../common/SmallButton";

const TravelDatePicker = ({ startDate, endDate, onEndDateChange, onStartDateChange, onClear, onNext }) => {
    // 获取今天的日期作为最小可选日期
    const today = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }, []);
    // 获取结束日期的最小值
    const minEndDate = useMemo(() => {
        if (startDate) {
            const d = new Date(startDate);
            d.setHours(0, 0, 0, 0);
            return d; // 允许同一天作为结束日
        }
        return today;
    }, [startDate, today]);


    // 处理开始日期变化
    const handleStartDateChange = (newDate) => {
        onStartDateChange(newDate);
        // 如果结束日期在新的开始日期之前或相等，清除结束日期
        if (endDate && newDate && endDate <= newDate) {
            onEndDateChange(null);
        }
    };
    
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <>
                {/* 日期选择器 */}
                <Grid container spacing={3} sx={{ mb: 3 }}>
                    {/* 开始日期 */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center', }}>
                            {/* <CalendarMonth sx={{ mr: 1 }} />  */}
                            📅 Start Date
                        </Typography>
                        <DatePicker
                            value={startDate}
                            onChange={handleStartDateChange}
                            minDate={today}
                            slotProps={{
                                textField: {
                                    size: 'small',
                                    fullWidth: true,
                                    placeholder: 'Select start date',
                                },
                            }}
                        />
                    </Grid>

                    {/* 结束日期 */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="body1" sx={{ mb: 2, display: 'flex', alignItems: 'center', }}>
                            {/* <CalendarMonth sx={{ mr: 1 }} /> */}
                            📅 End Date
                        </Typography>
                        <DatePicker
                            value={endDate}
                            onChange={(v) => onEndDateChange(v)}
                            minDate={minEndDate}
                            disabled={!startDate}
                            slotProps={{
                                textField: {
                                    size: 'small',
                                    // readOnly: true, 
                                    fullWidth: true,
                                    placeholder: 'Select return date',
                                    helperText: !startDate ? 'Please select start date first' : '',
                                }
                            }}
                        />
                    </Grid>
                </Grid>

                {/* 操作按钮 */}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <SmallButton
                        variant="outlined"
                        onClick={onClear}
                        disabled={!startDate && !endDate}
                    >
                        Clear Dates
                    </SmallButton>
                    <SmallButton
                        variant="contained"
                        onClick={onNext}
                        disabled={!startDate || !endDate}
                    >
                        Next
                    </SmallButton>
                </Box>
            </>

        </LocalizationProvider>
    );
};

export default TravelDatePicker;