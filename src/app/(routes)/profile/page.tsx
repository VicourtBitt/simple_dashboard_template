"use client";

import * as React from 'react';
import { signOut } from 'next-auth/react';
import { useUserSession } from "@/context/UserSessionContext"
import useTitle from '@/hooks/useTitle';
import { 
    Avatar, 
    Box, 
    Button, 
    Container, 
    Paper, 
    Typography, 
    CircularProgress, 
    Alert,
    Divider
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

export default function ProfilePage() {
    useTitle("Perfil", "VBitt Dashboard");
    const { session, loading } = useUserSession();

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/' });
    };

    if (loading) {
        return (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '80vh' }}>
            <CircularProgress />
        </Box>
        );
    }

    if (!session) {
        return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Alert severity="warning">
                Sessão não encontrada. Você será redirecionado para a página de login.
            </Alert>
        </Container>
        );
    }

    const { user } = session;
    return (
        <Container component="main" maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
            <Paper 
                elevation={4} 
                sx={{ 
                p: 4, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                borderRadius: '16px'
                }}
            >
                <Typography component="h1" variant="h4" gutterBottom>
                    Perfil do Usuário
                </Typography>
                
                <Avatar
                    src={user?.image ?? undefined}
                    alt={user?.name ?? 'Avatar do Usuário'}
                    sx={{ width: 100, height: 100, mb: 2, bgcolor: 'primary.main', fontSize: '3rem' }}
                >
                    {user?.name?.charAt(0).toUpperCase()}
                </Avatar>
                
                <Typography component="h2" variant="h5" sx={{ fontWeight: 'medium' }}>
                    {user?.name || 'Nome não disponível'}
                </Typography>
                
                <Typography color="text.secondary" gutterBottom>
                    {user?.email || 'Email não disponível'}
                </Typography>

                <Divider sx={{ my: 3, width: '100%' }} />

                <Button
                    type="button"
                    variant="contained"
                    color="error"
                    size="large"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                    sx={{ mt: 2, borderRadius: '8px', px: 4, py: 1.5 }}
                >
                    Sair (Logout)
                </Button>
            </Paper>
        </Container>
    );
}
