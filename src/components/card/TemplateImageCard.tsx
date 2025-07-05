"use client";

import CustomCard from "@/components/card/CustomCard";
import { Grid, Stack, Typography, Box } from "@mui/material";
import Image from "next/image";
import TemplateImage from "@/../public/images/template.png";

export default function TemplateImageCard() {
    return (
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomCard
            title="Template Básico"
            icon={<span className="material-icons">A+</span>}
            subtitle="Criado por VicourtBitt usando MUI e Next.js"
            height={600}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ height: "100%", flex: 1 }}
            >
              <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Image
                  src={TemplateImage}
                  alt="Template Image"
                  width={500}
                  height={500}
                  style={{ maxWidth: "100%", height: "auto", borderRadius: "15px" }}
                />
              </Box>
              <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="body1" align="center">
                  Este é um template básico para o MDAN, desenvolvido por
                  VicourtBitt. Sinta-se à vontade para personalizar e
                  expandir conforme necessário.
                </Typography>
              </Box>
            </Stack>
          </CustomCard>
        </Grid>
    )
}