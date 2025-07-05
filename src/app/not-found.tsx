import PageContainer from "@/components/page/PageContainer";
import { Typography, Grid } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
    return (
        <PageContainer title="">
            <Grid
                container
                spacing={2}
                sx={{ height: "100%", justifyContent: "center", alignItems: "center" }}
            >
                <Grid size={{ xs: 12 }} sx={{ mt: 6 }} textAlign="center">
                    <Typography variant="h2" gutterBottom>
                        Página não encontrada
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        A página que você está procurando não existe ou foi movida.
                    </Typography>
                    <Typography variant="body1" color="textSecondary" sx={{ marginTop: 2 }}>
                        Volte para a <Link href="/">página inicial</Link>.
                    </Typography>
                </Grid>
            </Grid>
        </PageContainer>
    );
}