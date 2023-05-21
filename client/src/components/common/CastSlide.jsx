import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs";
import { routesGen } from "../../routes/routes";

const CastSlide = ({ casts }) => {
  return (
    <Box sx={{
      "& .swiper-slide": {
        width: { xs: "50%", md: "25%", lg: "20.5%" },
        color: "primary.contrastText"
      }
    }}>
      <Swiper
        spaceBetween={30}
        slidesPerView={"7"}
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
        breakpoints={{
          320: {
              slidesPerView: 2,
          },
          600: {
              slidesPerView: 3,
          },
          900: {
              slidesPerView: 4,
          },
          1200: {
              slidesPerView: 7,
          },
      }}
      >
        {casts.map((cast, index) => (
          <SwiperSlide key={index}>
            <Link to={routesGen.person(cast.id)}>
              <Box sx={{
                paddingTop: "120%",
                color: "text.primary",
                ...uiConfigs.style.backgroundImage(tmdbConfigs.posterPath(cast.profile_path))
              }}>
                <Box sx={{
                  position: "absolute",
                  width: "100%",
                  height: "max-content",
                  bottom: 0,
                  padding: "10px",
                  backgroundColor: "rgba(0,0,0,0.6)"
                }}>
                  <Typography sx={{...uiConfigs.style.typoLines(2, "left")}}>
                    {cast.name} <br/>
                    <span style={{opacity:".5"}}>{cast.character}</span>
                  </Typography>
                </Box>
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CastSlide;