import { Box } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import AutoSwiper from "./AutoSwiper";

const PosterSlide = ({ posters }) => {
  return (
    <AutoSwiper>
      {[...posters].splice(0, 10).map((item, index) => (
        <SwiperSlide key={index}>
          <Box sx={{
            padding: "15px",
            border: `1px solid rgba(59,130,246,.5)`,
            borderRadius: "10px",
            transition: "transform .3s ease-in-out",
            backgroundColor: "#0B0F29",
            "&:hover ": { transform: "scale(.97)" },
          }}>
            <Box sx={{
              paddingTop: "160%",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundImage: `url(${tmdbConfigs.posterPath(item.file_path)})`
            }} />
          </Box>
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default PosterSlide;