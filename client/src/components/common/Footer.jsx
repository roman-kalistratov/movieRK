import { Paper, Stack, Button, Box, IconButton, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { themeModes } from "../../configs/theme.configs";
import { setThemeMode } from "../../redux/features/themeModeSlice";
import menuConfigs from "../../configs/menu.configs";

import Container from './Container';
import Logo from './Logo';

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import footerLogo from "../../assets/Logo-Yellow.png"



const Footer = () => {
  const dispatch = useDispatch();
  const { themeMode } = useSelector((state) => state.themeMode);

  const onSwithTheme = () => {
    const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };

  return (
    <Container>
      <Paper square={true} sx={{ backgroundImage: "unset", padding: "2rem" }}>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction={{ xs: "column", md: "row " }}
          sx={{ height: "max-content" }}
        >
          <Logo />
          <Box display="flex" alignItems="center">
            <Typography
              variant="h7"
              fontWeight="300"
            >
              Designed & Built by
            </Typography>
            <Link >
              <img style={{ width: "1.5rem", marginLeft:"0.5rem" }} src={footerLogo} alt="logo-rk" />
            </Link>
          </Box>
          <Stack direction={{ xs: "column", md: "row " }}>
            {menuConfigs.main.map((item, index) => (
              <Button
                key={index}
                sx={{ color: "inherit" }}
                component={Link}
                to={item.path}
              >
                {item.display}
              </Button>
            ))}
            <IconButton
              sx={{ color: "inherit" }}
              onClick={onSwithTheme}
            >
              {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
              {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
            </IconButton>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Footer;