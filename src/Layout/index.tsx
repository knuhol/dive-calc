import React, { ReactChild } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

import Copyright from './Copyright';
import NavBar from './NavBar';
import Menu from './Menu';

const DRAWER_WIDTH = 240;

const mdTheme = createTheme();

interface LayoutProps {
  children: ReactChild;
}

const Layout = ({ children }: LayoutProps) => (
  <ThemeProvider theme={mdTheme}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavBar drawerWidth={DRAWER_WIDTH} />
      <Menu drawerWidth={DRAWER_WIDTH} />
      <Box
        component="main"
        sx={{
          backgroundColor: theme =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children}
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  </ThemeProvider>
);

export default Layout;