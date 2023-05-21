import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Box, Divider, ListItemButton, ListItemIcon, ListItemText, Menu, Typography, useTheme } from "@mui/material";
import { themeModes } from "../../configs/theme.configs";
import menuConfigs from "../../configs/menu.configs";

import { setUser } from "../../redux/features/userSlice";
import { setThemeMode } from "../../redux/features/themeModeSlice";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";

const UserMenu = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useSelector((state) => state.user);
  const { themeMode } = useSelector((state) => state.themeMode);

  const toggleMenu = (e) => setAnchorEl(e.currentTarget);

  const onSwithTheme = () => {
    const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };

  return (
    <>
      {(
        <>
          <Typography
            variant="h6"
            sx={{ cursor: "pointer", userSelect: "none" }}
            onClick={toggleMenu}
            textAlign="center"
          >
            Hi <Box component="span"
              sx={{
                borderBottom: `1px solid ${theme.palette.primary.main}`,
                color: theme.palette.primary.main
              }} >
              {user.displayName}
            </Box>
          </Typography>

          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            PaperProps={{ sx: { padding: 1, borderRadius: "10px" } }}
          >
            {menuConfigs.user.map((item, index) => (
              <ListItemButton
                component={Link}
                to={item.path}
                key={index}
                onClick={() => setAnchorEl(null)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText disableTypography primary={
                  <Typography textTransform="capitalize">{item.display}</Typography>
                } />

              </ListItemButton>
            ))}
            <Divider />
            <ListItemButton
              sx={{ borderRadius: "10px" }}
              onClick={() => dispatch(setUser(null))}
            >
              <ListItemIcon><LogoutOutlinedIcon /></ListItemIcon>
              <ListItemText disableTypography primary={
                <Typography textTransform="capitalize">sign out</Typography>
              } />
            </ListItemButton>
            <ListItemButton
              sx={{ color: "inherit" }}
              onClick={onSwithTheme}
            >
              <ListItemIcon>
                {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
                {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
              </ListItemIcon>
              <ListItemText disableTypography primary={
                <Typography textTransform="capitalize">switch theme</Typography>
              } />
            </ListItemButton>
          </Menu>
        </>
      )}
    </>
  );
};

export default UserMenu;