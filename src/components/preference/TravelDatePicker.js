import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Typography, Grid } from '@mui/material';
import SmallButton from "../common/SmallButton";

const TravelDatePicker = ({ onDateChange, onClear }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const today = new Date(); // 获取今天的日期作为最小可选日期
    today.setDate(today.getDate());

    // 格式化日期显示
    const formatDate = (date) => {
        if (!date) return '';
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // 计算两个日期之间的天数
    const calculateDaysDifference = (start, end) => {
        if (!start || !end) return 0;
        const diffTime = end.getTime() - start.getTime() + 1; // 包括结束日
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    // 处理开始日期变化
    const handleStartDateChange = (newDate) => {
        setStartDate(newDate);
        // 如果结束日期在新的开始日期之前或相等，清除结束日期
        if (endDate && newDate && endDate <= newDate) {
            setEndDate(null);
        }
    };

    // 处理结束日期变化
    const handleEndDateChange = (newDate) => {
        setEndDate(newDate);
    };

    // 获取结束日期的最小值
    const getMinEndDate = () => {
        if (startDate) {
            const minEndDate = new Date(startDate);
            minEndDate.setDate(startDate.getDate());
            return minEndDate;
        }
        return today;
    };

    // 清除日期
    const handleClearDates = () => {
        setStartDate(null);
        setEndDate(null);

        // 通知父组件
        if (onClear) {
            onClear();
        }
    };

    // 获取旅行天数
    const getTripDuration = () => {
        return calculateDaysDifference(startDate, endDate);
    };

    // 确认日期选择
    const handleConfirm = () => {
        if (startDate && endDate) {
            const tripData = {
                startDate: startDate.toISOString().split('T')[0], // YYYY-MM-DD 格式
                endDate: endDate.toISOString().split('T')[0],
                duration: getTripDuration(),
                startDateFormatted: formatDate(startDate),
                endDateFormatted: formatDate(endDate),
                startDateObject: startDate,
                endDateObject: endDate
            };

            // 调用父组件传入的回调函数
            if (onDateChange) {
                onDateChange(tripData);
            }

            // 示例：显示确认信息
            console.log('Selected trip dates:', tripData);
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
                            onChange={handleEndDateChange}
                            minDate={getMinEndDate()}
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
                        onClick={handleClearDates}
                        disabled={!startDate && !endDate}
                    >
                        Clear Dates
                    </SmallButton>
                    <SmallButton
                        variant="contained"
                        onClick={handleConfirm}
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