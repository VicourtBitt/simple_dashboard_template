"use client";

import * as React from 'react';
import PageContainer from "@/components/page/PageContainer";
import { Grid, CircularProgress, Box } from "@mui/material";
import IncomeBarChart from "@/sections/graphs/IncomeBarChart"; // Nome do componente atualizado
import { IncomeData, generateFakeIncomeData, generateFakeRentData, RentData } from "@/lib/utils"; // Importando do novo utilitário
import RentPieChart from '@/sections/graphs/PieRentChart';
import useTitle from '@/hooks/useTitle';

export default function AnalyticsPage() {
    useTitle("Análise de Faturamento", "VBitt Dashboard");
    const [incomeData, setIncomeData] = React.useState<IncomeData[]>([]);
    const [rentData, setRentData] = React.useState<RentData[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            const incomeResult = await generateFakeIncomeData(30);
            const rentResult = await generateFakeRentData();
            setIncomeData(incomeResult);
            setRentData(rentResult);
            setLoading(false);
        })();
    }, []);
    

    return (
        <PageContainer title="Análise de Faturamento">
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}> 
                    {loading ? (
                        <Box display="flex" justifyContent="center">
                            <CircularProgress />
                        </Box>
                    ) : (
                        <IncomeBarChart data={incomeData} />
                    )}
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    {loading ? (
                        <Box display="flex" justifyContent="center">
                            <CircularProgress />
                        </Box>
                    ) : (
                        <RentPieChart data={rentData} />
                    )}
                </Grid>
            </Grid>
        </PageContainer>
    );
}