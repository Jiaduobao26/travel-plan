import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Slide, Tab, Box
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Travelers from './preference/Travelers';
import TravelDatePicker from './preference/TravelDatePicker';
import TravaelBudget from './preference/TravelBudget';
import PreferenceSummary from './preference/PreferenceSummary';
import Title from './preference/Title';

import friends from '../assets/friends.png';
import budget from '../assets/budget.png';
import travel from '../assets/travel.png';
import calendar from '..//assets/wall-calendar.png';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const MyDialog = ({ open, onClose, title, onConfirm }) => {
    const [value, setValue] = React.useState('1');
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0); 
    const [pets, setPets] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const setDates = (r) => {
        console.log('Selected dates:', r);
    }
    const onAdultsChange = (newValue) => {
        setAdults(newValue);
    }
    const onChildrenChange = (newValue) => {
        setChildren(newValue);
    }
    const onInfantsChange = (newValue) => {
        setInfants(newValue);
    }
    const onPetsChange = (newValue) => {
        setPets(newValue);
    }
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            slots={{
                transition: Transition,
            }}
            PaperProps={{
                sx: {
                    minHeight: '600px',       // 最小高度
                    maxHeight: '80vh',        // 最大高度
                }
            }}
        >
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', mb: 3 }} >
                <Box
                    component="img"
                    src={travel}
                    alt="Travel"
                    sx={{ width: 20, height: 20, marginRight: 1, objectFit: 'cover' }}
                />
                {title}
            </DialogTitle>
            <DialogContent sx={{ display: 'flex' }}>
                <Box sx={{ flex: 1, pr: 2 }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="When" value="1" />
                                <Tab label="Who" value="2" />
                                <Tab label="Budget" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <Title
                                src={calendar}
                                title="Travel Date Picker"
                                description="Select your travel dates. Only future dates are available for booking."
                            />
                            <TravelDatePicker
                                onDateChange={setDates} />
                        </TabPanel>
                        <TabPanel value="2">
                            <Title
                                src={friends}
                                title="Travelers & Pets"
                                description="Tell us who’s going — adults, children, and even pets are welcome."
                            />
                            <Travelers
                                adults={adults}
                                children={children}
                                infants={infants}
                                pets={pets}
                                onAdultsChange={onAdultsChange}
                                onChildrenChange={onChildrenChange}
                                onInfantsChange={onInfantsChange}
                                onPetsChange={onPetsChange}
                            />
                        </TabPanel>
                        <TabPanel value="3">
                            <Title
                                src={budget}
                                title="Travel Budget"
                                description="Set your budget to get tailored options."
                            />
                            <TravaelBudget />
                        </TabPanel>
                    </TabContext>
                </Box>
                <Box sx={{ width: 250 }}>
                    <PreferenceSummary />
                </Box>

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                {onConfirm && (
                    <Button onClick={onConfirm} variant="contained">
                        Confirm
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};
export default MyDialog;