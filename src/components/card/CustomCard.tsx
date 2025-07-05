/**
 * @name CustomCard
 */
"use client";
import * as React from 'react';
import { Divider } from '@mui/material';
import {
    Box,
    Typography,
    Tooltip,
    Card,
    CardHeader,
    CardContent,
    IconButton,
    Button,
    CardActions,
    Link,
    Grid,
} from '@mui/material';
import {
    InfoOutlined,
    ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import AvatarWrapper from '@/components/avatar/AvatarWrapper';
import LoadingFallback from '@/components/loading/LoadingFallback';
import { useTheme } from '@/theme/ThemeProvider';


export default function CustomCard({
    title,
    subtitle,
    description,
    icon,
    children,
    loading,
    href,
    height,
    label = "Ver Detalhes"
}: {
    title: string,
    subtitle?: string,
    description?: string,
    icon: React.ReactNode,
    children: React.ReactNode,
    loading?: boolean,
    href?: string
    height?: number,
    label?: string
}) {
    const { theme } = useTheme();

    if (loading) {
        return (
            <Grid 
                size={{ xs: 12 }}
                sx={{
                    height: '100%',
                }}
            >
                <LoadingFallback />
            </Grid>
        )   
    }

    return (
        <Grid size={{ xs: 12 }}>
            <Card
                elevation={2}
                sx={{
                    height: height || '400px',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: theme.shadows[3],
                    },
                }}
            >
                <Box sx={{ position: 'relative' }}>
                    <CardHeader
                        avatar={
                            <AvatarWrapper>
                                {icon}
                            </AvatarWrapper>
                        }
                        title={
                            <Typography variant="h6" component="div">   
                                {title}
                            </Typography>
                        }
                        subheader={
                            <Typography variant="subtitle2" color="text.secondary">
                                {subtitle}
                            </Typography>
                        }
                        action={
                            <Tooltip
                                title={description}
                                arrow
                                placement="top"
                                sx={{
                                    cursor: 'help'
                                }}
                            >
                                <IconButton size="small">
                                    <InfoOutlined fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        }
                        sx={{
                            pb: 1,
                            '& .MuiCardHeader-content': {
                              overflow: 'hidden'
                            }
                        }}
                    />
                    <Divider />
                </Box>

                <CardContent
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                    }}
                >
                    { children }
                </CardContent>

                {href && (
                    <>
                        <Divider />
                        <CardActions 
                            sx={{ 
                                justifyContent: 'center',
                                p: 1.5
                            }}
                        >
                            <Button 
                                component={Link}
                                href={href}
                                variant="text" 
                                color="primary" 
                                size="medium"
                                endIcon={<ArrowForwardIcon />}
                                sx={{ 
                                    fontWeight: 500,
                                    textTransform: 'none'
                                }}
                            >
                                {label}
                            </Button>
                        </CardActions>
                    </>
                )}
            </Card>
        </Grid>
    )
}