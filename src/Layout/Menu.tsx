import * as React from 'react';

import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { DrawerProps, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';

import Link from '../Link';
import { useApp } from '../AppContext';

interface StyledMenuProps extends DrawerProps {
  open: boolean;
  drawerWidth: number;
}

const StyledMenu = styled(MuiDrawer, {
  shouldForwardProp: prop => !['open', 'drawerWidth'].includes(prop.toString()),
})<StyledMenuProps>(({ theme, open, drawerWidth }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

interface MenuProps {
  drawerWidth: number;
}

const Menu = ({ drawerWidth }: MenuProps) => {
  const { isMenuOpen, toggleMenu } = useApp();

  return (
    <StyledMenu variant="permanent" open={isMenuOpen} drawerWidth={drawerWidth}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleMenu}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <ListItemButton component={Link} noLinkStyle href="/">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={Link} noLinkStyle href="/orders">
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItemButton>
      </List>
    </StyledMenu>
  );
};

export default Menu;
