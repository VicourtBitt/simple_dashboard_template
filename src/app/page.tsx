"use client";

import { Grid } from "@mui/material";
import CustomCard from "@/components/card/CustomCard";
import useTitle from "@/hooks/useTitle";
import PageContainer from "@/components/page/PageContainer";
import { useUserSession } from "@/context/UserSessionContext";
import TemplateImageCard from "@/components/card/TemplateImageCard";

export default function Home() {
  useTitle("Home", "VBitt Dashboard");
  const { session } = useUserSession();

  return (
    <PageContainer title={`Welcome, ${session?.user?.name || "User"}`}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomCard
            title="Bem vindo ao VBitt Dashboard"
            icon={<span className="material-icons">A+</span>}
            subtitle="Dashboard com informações mockadas"
            height={600}
          >
            <p>
              Utilize o menu lateral para navegar entre as diferentes seções do
              sistema.
            </p>
          </CustomCard>
        </Grid>
        <TemplateImageCard />
      </Grid>
    </PageContainer>
  );
}
