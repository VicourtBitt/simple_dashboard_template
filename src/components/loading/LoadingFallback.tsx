import { CircularProgress, Box } from "@mui/material";

export default function LoadingFallback() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
            }}
        >
            <CircularProgress color="primary"/>
        </Box>
    );
}