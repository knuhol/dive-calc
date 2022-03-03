import React from 'react';

import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar/AppBar';

import { useApp } from '../AppContext';

interface StyledNavBarProps extends MuiAppBarProps {
  open: boolean;
  drawerWidth: number;
}

const StyledNavBar = styled(MuiAppBar, {
  shouldForwardProp: prop => !['open', 'drawerWidth'].includes(prop.toString()),
})<StyledNavBarProps>(({ theme, open, drawerWidth }) => {
  return {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  };
});

interface NavBarProps {
  drawerWidth: number;
}

const NavBar = ({ drawerWidth }: NavBarProps) => {
  const { isMenuOpen, toggleMenu } = useApp();

  return (
    <StyledNavBar position="absolute" open={isMenuOpen} drawerWidth={drawerWidth}>
      <Toolbar
        sx={{
          pr: '24px',
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleMenu}
          sx={{
            marginRight: '36px',
            ...(isMenuOpen && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Dive Calc
        </Typography>
      </Toolbar>
    </StyledNavBar>
  );
};

export default NavBar;
