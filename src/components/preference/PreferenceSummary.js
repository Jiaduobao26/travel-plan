import React from 'react';
import { Alert, Typography, Grid } from '@mui/material';
function PreferneceSummary() {
    return <Alert
        severity="success"
        icon={false}
        sx={{ mb: 3 }}
    >
        <Typography variant="h6" sx={{ mb: 1 }}>
            🧳 Trip Summary
        </Typography>
        <Grid container spacing={2}>
            <Grid item size={12}>
                <Typography variant="body2" color="text.secondary">
                    Start
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                    15/09/2025
                </Typography>
            </Grid>
            <Grid item size={12}>
                <Typography variant="body2" color="text.secondary">
                    End
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                    19/09/2025
                </Typography>
            </Grid>
            <Grid item size={12}>
                <Typography variant="body2" color="text.secondary">
                    Duration
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                    5 days
                </Typography>
            </Grid>
            <Grid item size={12}>
                <Typography variant="body2" color="text.secondary">
                    Travelers
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                    1
                </Typography>
            </Grid>
            <Grid item size={12}>
                <Typography variant="body2" color="text.secondary">
                    Budget
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                    Any
                </Typography>
            </Grid>
        </Grid>
    </Alert>

}
export default PreferneceSummary;