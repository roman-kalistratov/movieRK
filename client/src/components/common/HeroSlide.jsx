import { Box, Button, Chip, Divider, Stack, Typography, useTheme } from "@mui/material";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { EffectFade, Autoplay, Navigation } from "swiper";
import { routesGen } from "../../routes/routes";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CircularRate from "./CircularRate";
import mediaApi from "../../api/modules/media.api";
import genreApi from "../../api/modules/genre.api";
import uiConfigs from "../../configs/ui.configs";
import tmdbConfigs from "../../api/configs/tmdb.configs";

const HeroSlide = ({ mediaType, mediaCategory }) => {
  const theme = useTheme();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1
      });

      if (response) setMovies(response.results);
      if (err) toast.error(err.message);
      dispatch(setGlobalLoading(false));
    };

    const getGenres = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await genreApi.getList({ mediaType });

      if (response) {
        setGenres(response.genres);
        getMedias();
      }
      if (err) {
        toast.error(err.message);
        setGlobalLoading(false);
      }
    };
    getGenres();
  }, [mediaType, mediaCategory, dispatch]);

  return (
    <Box sx={{
      marginTop: { xs: "2rem", md: "1rem" },
      paddingX: { xs: 1, md: 0 },
      "& .swiper-slide": {
        opacity: "0.4",
        transform: "scale(.9)",
        transition: "transform .4s linear",
      },
      "& .swiper-slide-active": { opacity: 1, transform: "scale(1)" },

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
        grabCursor={true}
        loop={true}
        slidesPerView={1.5}
        centeredSlides={true}
        initialSlide={2}
        navigation={true}
        style={{ width: "100%", height: "max-content" }}
        modules={[EffectFade, Autoplay, Navigation]}
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
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index} >
            <Box sx={{
              paddingTop: {
                xs: "80%",
                sm: "40%",
                md: "60%",
                lg: "45%"
              },
              borderRadius: "1.5rem",
              backgroundPosition: "top",
              backgroundSize: "cover",
              backgroundImage: `url(${tmdbConfigs.backdropPath(movie.backdrop_path || movie.poster_path)})`,
              backgroundRepeat: "no-repeat",
              position: "relative",
              "&::before": {
                content: '""',
                width: "100%",
                height: "30%",
                position: "absolute",
                borderRadius: "1.2rem",
                bottom: 0,
                left: 0,
                zIndex: 2,
                pointerEvents: "none",
                ...uiConfigs.style.gradientBgImage[theme.palette.mode]
              }
            }} />
            <Box sx={{
              width: { xs: "100%", md: "50%" },
              height: "100%",
              position: "absolute",
              borderRadius: "1.5rem",
              top: 0,
              left: 0,
              ...uiConfigs.style.horizontalGradientBgImage[theme.palette.mode]
            }} />
            <Box sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              paddingX: { xs: "1rem", sm: "2rem", md: "3rem", lg: "5rem" }
            }}>
              <Box sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                color: "text.primary",
                width: { xs: "99%", sm: "70%", md: "50%", lg: "60%" }
              }}>
                <Stack spacing={{ xs: 2, sm: 2, xl: 5 }} direction="column">
                  {/* title */}
                  <Typography
                    variant="h4"
                    fontSize={{ xs: "1.4rem", sm: "1.5rem", lg: "2rem", xl: "3rem" }}
                    fontWeight="700"
                    sx={{
                      ...uiConfigs.style.typoLines(2, "left")
                    }}
                  >
                    {movie.title || movie.name}
                  </Typography>
                  {/* title */}
                  <Stack direction="row" spacing={1} alignItems="center">
                    {/* rating */}
                    <CircularRate value={movie.vote_average} />
                    {/* rating */}

                    <Divider orientation="vertical" />
                    {/* genres */}
                    {[...movie.genre_ids].splice(0, 2).map((genreId, index) => (
                      <Chip
                        variant="outlined"
                        color="primary"
                        key={index}
                        label={genres.find(e => e.id === genreId) && genres.find(e => e.id === genreId).name}
                      />
                    ))}
                    {/* genres */}
                  </Stack>

                  {/* overview */}
                  <Typography variant="body1" sx={{
                    ...uiConfigs.style.typoLines(3),
                    paddingRight: { xs: 3 }
                  }}
                  >
                    {movie.overview}
                  </Typography>
                  {/* overview */}

                  {/* buttons */}
                  <Button
                    variant="outlined"
                    size="medium"
                    startIcon={<PlayArrowIcon />}
                    component={Link}
                    to={routesGen.mediaDetail(mediaType, movie.id)}
                    sx={{ width: "max-content" }}
                  >
                    watch now
                  </Button>
                  {/* buttons */}
                </Stack>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HeroSlide;