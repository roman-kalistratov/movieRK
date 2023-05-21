import { Box } from "@mui/material";
import { Swiper } from "swiper/react";

const SlideContainer = ({ children }) => {
    return (
        <Box sx={{
            "& .swiper-slide": {
                width: {
                    xs: "50%",
                    sm: "35%",
                    md: "25%",
                    lg: "20.5%"
                }
            }
        }}>
            <Swiper
                slidesPerView="auto"
                grabCursor={true}
                spaceBetween={30}
                style={{ width: "100%", height: "max-content" }}
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                    },
                    600: {
                        slidesPerView: 3,
                    },
                    1200: {
                        slidesPerView: 5,
                    },
                }}
            >
                {children}
            </Swiper>
        </Box>
    )
}

export default SlideContainer