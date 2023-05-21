import { Box, useTheme } from "@mui/material";
import uiConfigs from "../../configs/ui.configs";

const ImageHeader = ({ imgPath }) => {
  const theme = useTheme();

  return (
    <Box sx={{
      zIndex: "-1",
      position: "relative",
      paddingTop: { xs: "50%", sm: "40%", md: "47%" },
      backgroundPosition: "top",
      backgroundSize: "cover",
      backgroundImage: `url(${imgPath})`,
      backgroundAttachment: "fixed",
      "&::before": {
        content: '""',
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        ...uiConfigs.style.gradientBgImage[theme.palette.mode]
      },
      "&::after": {
        content: '""',
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "30%",
        height: "100%",
        pointerEvents: "none",
        ...uiConfigs.style.horizontalGradientBgImage[theme.palette.mode]
      }
    }} />
  );
};

export default ImageHeader;