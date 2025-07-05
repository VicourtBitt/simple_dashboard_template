"use client";

import * as React from "react";
import CustomCard from "@/components/card/CustomCard";

import { PieChart } from '@mui/x-charts/PieChart';
import { ChartsLegend } from '@mui/x-charts/ChartsLegend';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import { RentData } from "@/lib/utils";
import { PieChart as PieChartIcon } from "@mui/icons-material";

const getLabelFromType = (type: RentData['type']) => {
    switch (type) {
        case 'C': return 'Compras';
        case 'D': return 'Vendas';
        case 'R': return 'Aluguéis';
        default: return 'Outro';
    }
};

export default function RentPieChart({ data = [] as RentData[] }) {
    const transformedData = React.useMemo(() => data.map(item => ({
        id: item.type, // Usar o tipo como ID único
        value: item.value,
        label: getLabelFromType(item.type),
        color: item.type === 'C' ? '#0288d1' : (item.type === 'D' ? '#f57c00' : '#4caf50') // Cores customizadas
    })), [data]);

    return (
        <CustomCard
            title="Distribuição de Transações"
            description="Visão geral do volume por tipo de operação."
            icon={<PieChartIcon />}
        >
            <PieChart
                height={300}
                series={[
                    {
                        data: transformedData,
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        innerRadius: 40,
                        outerRadius: 100,
                        paddingAngle: 3,
                        cornerRadius: 5,
                    },
                ]}
            >
                <ChartsLegend />
                <ChartsTooltip />
            </PieChart>
        </CustomCard>
    );
}