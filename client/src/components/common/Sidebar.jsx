import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Logo from '../common/Logo'
import { Button, Stack, TextField, Toolbar, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setAppState } from "../../redux/features/appStateSlice";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import menuConfigs from '../../configs/menu.configs';
import uiConfigs from '../../configs/ui.configs';
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import UserMenu from "./UserMenu";
import { setQuery } from '../../redux/features/searchQuerySlice';

const drawerWidth = uiConfigs.size.sidebarWith;

function Sidebar(props) {
  const { window } = props;
  const theme = useTheme();
  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { query } = useSelector((state) => state.query);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const onQueryChange = (e) => {
    dispatch(setQuery(e.target.value));
    navigate("/search");
  };

  const drawer = (
    <>
      <Stack paddingY={1.2} direction="row" justifyContent="center">
        <Logo />
      </Stack>
      <Divider />
      {/* user menu */}
      <Stack paddingY={1.2} spacing={3} direction="row" alignItems="center" justifyContent="center">
        {!user && <Button
          variant="outlined"
          onClick={() => dispatch(setAuthModalOpen(true))}
        >
          sign in
        </Button>}

        {user && <UserMenu />}
      </Stack>
      {/* user menu */}
      <Divider />
      {/* search panel */}
      <TextField
        style={{ color: theme.palette.primary.main }}
        placeholder="Search MoonFlix..."
        sx={{ paddingX: .2, width: "100%", marginY: 2 }}
        autoFocus
        size="small"
        onChange={onQueryChange}
        value={query}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Divider />
      {/* search panel */}
      {/* main menu */}
      <List dense>
        {menuConfigs.main.map((item, index) => (
          <ListItemButton
            key={index}
            sx={{
              color: appState.includes(item.state) ? "primary.main" : "unset"
            }}
            onClick={() => dispatch(setAppState(item.state))}
            component={Link}
            to={item.path}
          >
            <ListItemIcon sx={{
              color: appState.includes(item.state) ? "primary.main" : "unset",
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText disableTypography primary={<Typography textTransform="capitalize">
              {item.display}
            </Typography>} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      {/* main menu */}
      <Toolbar />
    </>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', '& ::-webkit-scrollbar': { display: "none" } }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          display: { sx: "block", md: "none" }
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerToggle}
          sx={{ position: "absolute", right: "4vw", top: "1vh", display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >

        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            zIndex:"2",
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
      </Box>
    </Box>
  );
}



export default Sidebar;