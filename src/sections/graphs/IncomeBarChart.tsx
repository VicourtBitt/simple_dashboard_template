"use client"

import * as React from "react";
import CustomCard from "@/components/card/CustomCard";
import { BarPlot, ChartContainer, ChartsAxisHighlight, ChartsTooltip, ChartsYAxis, ChartsXAxis } from '@mui/x-charts';
import { IncomeData } from "@/lib/utils";
import { BarChart } from "@mui/icons-material";
import { useTheme } from "@/theme/ThemeProvider";

const valueFormatter = (value: number | null) => value === null ? '' : `R$ ${value.toLocaleString('pt-BR')}`;

export default function IncomeBarChart({
    data = [] as IncomeData[],
}) {
    const {theme} = useTheme();
    return (
        <CustomCard
            title="Receita por Dia"
            description="Visão geral do faturamento nos últimos 30 dias."
            icon={<BarChart />}
        >
            <ChartContainer
                sx={{ height: '100%', width: '100%' }}
                height={300}
                series={[
                    {
                        type: 'bar',
                        data: data.map(item => item.income),
                        label: 'Receita',
                        yAxisId: 'incomeAxis',
                        xAxisId: 'dateAxis',
                        color: theme.palette.primary.main,
                        valueFormatter,
                    },
                ]}
                xAxis={[
                    {
                        id: 'dateAxis',
                        data: data.map(item => item.datetime),
                        scaleType: 'band',
                        valueFormatter: (date: Date) => date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
                    }
                ]}
                yAxis={[
                    {
                        id: 'incomeAxis',
                        label: 'Receita (R$)',
                    }
                ]}
            >
                <BarPlot />
                <ChartsAxisHighlight x="band" />
                <ChartsTooltip />
                <ChartsXAxis
                    axisId="dateAxis"
                    label="Data"
                />
                <ChartsYAxis
                    label="Receita (R$)"
                    axisId={'incomeAxis'}
                />
            </ChartContainer>
        </CustomCard>
    );
}