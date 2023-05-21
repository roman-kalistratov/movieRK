import { Box , useTheme} from "@mui/material";
import { Navigation, Pagination } from "swiper";
import { Swiper } from "swiper/react";

const NavigationSwiper = ({ children }) => {
  const theme = useTheme();
  return (
    <Box sx={{
      marginTop: { xs: "2rem", md: "0" },
      paddingX: { xs: 1, md: 0 },
      "& .swiper-slide": {
        opacity: "0.4",
        transform: "scale(.9)",
        transition: "transform .4s linear",
      },
      "& .swiper-slide-active": { opacity: 1, transform: "scale(1)" },
      "& .swiper-pagination-bullet": {
        backgroundColor: "text.primary",
      },      
      "& .swiper-button-next, & .swiper-button-prev": {
        color: `${theme.palette.primary.main}`,
        borderRadius: "50%",
        padding: 2.5,
        border: `2px solid ${theme.palette.primary.main}`,
        opacity: ".5",
        transition: "opacity .2s linear",
        display: { xs: "none", md: "flex" },
        "&::after": {
          fontSize: { md: ".896rem", lg: "1.2rem" }
        },
        "&:hover": {
          opacity: "1",
        }
      },
      "& .swiper-button-prev": { left: "15%" },
      "& .swiper-button-next": { right: "15%" }
    }}>
      <Swiper
        spaceBetween={10}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"1.5"}
        pagination={{ clickable: true }}
        initialSlide={2}
        loop={true}
        navigation={true}
        modules={[Navigation, Pagination]}
        style={{ width: "100%", height: "max-content", paddingBottom:"3rem" }}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          900: {
            slidesPerView: 1.5,
            spaceBetween: 10,
          },
          1024: {
            spaceBetween: 20,
          },
          1536: {
            spaceBetween: 30,
          }
        }}      
      >
        {children}
      </Swiper>
    </Box>
  );
};

export default NavigationSwiper;