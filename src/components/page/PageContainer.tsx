"use client"

import { Grid, Typography } from "@mui/material";

export default function PageContainer({
    children,
    title,
}: {
    children: React.ReactNode;
    title: string;
}) {
    return (
        <Grid container sx={{ px:6, py:4 }}>
            <Typography variant="h3" fontWeight={"bold"} gutterBottom>
                { title || '' }
            </Typography>
            <Grid size={12}>
                {children}
            </Grid>
        </Grid>
    );
}