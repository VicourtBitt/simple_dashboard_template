"use client";

import * as React from 'react';
import { AgGauge } from 'ag-charts-react';
import { Grid } from '@mui/material';
import { AgRadialGaugeOptions } from 'ag-charts-enterprise';
import "ag-charts-enterprise"

export default function AgRadialGauge({
    options,
}: {
    options: AgRadialGaugeOptions;
}) {
    const [optionsState, setOptions] = React.useState<AgRadialGaugeOptions>(options);

    React.useEffect(() => {
        setOptions(options);
    }, [options]);

    return (
        <Grid sx={{ width: '100%', height: '100%' }}>
            <AgGauge
                options={optionsState}
                style={{ width: '100%', height: '100%' }}
            />
        </Grid>
    );
}
