
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import { routesGen } from "../../routes/routes";
import { toast } from "react-toastify";
import CircularRate from "./CircularRate";
import favoriteUtils from "../../utils/favorite.utils";

import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs";
import favoriteApi from "../../api/modules/favorite.api";

import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { addFavorite, removeFavorite } from "../../redux/features/userSlice";
import { setQuery } from '../../redux/features/searchQuerySlice';

const MediaItem = ({ media, mediaType }) => {
  const theme = useTheme();
  const { user, listFavorites } = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const [rate, setRate] = useState(null);
  const [onRequest, setOnRequest] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(media.title || media.name || media.mediaTitle);

    setPosterPath(tmdbConfigs.posterPath(media.poster_path || media.backdrop_path || media.mediaPoster || media.profile_path));

    if (mediaType === tmdbConfigs.mediaType.movie) {
      setReleaseDate(media.release_date && media.release_date.split("-")[0]);
    } else {
      setReleaseDate(media.first_air_date && media.first_air_date.split("-")[0]);
    }

    setRate(media.vote_average || media.mediaRate);
  }, [media, mediaType]);

  const onFavoriteClick = async (e) => {
    e.preventDefault()
    if (!user) return dispatch(setAuthModalOpen(true));

    if (onRequest) return;

    if (favoriteUtils.check({ listFavorites, mediaId: media.id })) {
      onRemoveFavorite();
      return;
    }

    setOnRequest(true);

    const body = {
      mediaId: media.id,
      mediaTitle: media.title || media.name,
      mediaType: mediaType,
      mediaPoster: media.poster_path,
      mediaRate: media.vote_average
    };

    const { response, err } = await favoriteApi.add(body);

    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      dispatch(addFavorite(response));
      toast.success("Add favorite success");
    }
  };

  const onRemoveFavorite = async () => {
    if (onRequest) return;
    setOnRequest(true);

    const favorite = listFavorites.find(e => e.mediaId.toString() === media.id.toString());

    const { response, err } = await favoriteApi.remove({ favoriteId: favorite.id });

    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      dispatch(removeFavorite(favorite));
      toast.success("Remove favorite success");
    }
  };

  return (
    <Link to={mediaType !== "people" ? routesGen.mediaDetail(mediaType, media.mediaId || media.id) : routesGen.person(media.id)} onClick={() => dispatch(setQuery(""))}>
      <Box sx={{
        padding: "15px",
        border: `1px solid rgba(59,130,246,.5)`,
        borderRadius: "10px",
        transition: "transform .5s ease-in-out",
        // backgroundColor: "#0B0F29",
        backgroundColor: `${theme.palette.background.paper}`,
        "&:hover ": { transform: "scale(.97)" },
      }}>
        <Box sx={{
          ...uiConfigs.style.backgroundImage(posterPath),
          paddingTop: "160%",
          "&:hover .media-info": { opacity: 1, bottom: 0 },
          "&:hover .media-back-drop, &:hover .media-play-btn, &:hover .favorite-icon-box": { opacity: 1 },
          "&:hover .favorite-icon-box": { transform: "translateX(0)" },
          color: "primary.contrastText",
          borderRadius: "10px"
        }}>
          {/* movie or tv item */}
          {mediaType !== "people" && Number.isInteger(media.id) && (
            <>
              <LoadingButton
                className="favorite-icon-box"
                variant="text"
                sx={{
                  width: "max-content",
                  minWidth: "max-content",
                  position: "absolute",
                  top: 2,
                  right: 2,
                  zIndex: 1,
                  opacity: { xs: 1, md: 0 },
                  transform: { xs: "translateX(0)", md: "translateX(20px)" },
                  transition: "all 0.3s ease",
                }}
                loadingPosition="center"
                loading={onRequest}
                onClick={onFavoriteClick}
              >
                {favoriteUtils.check({ listFavorites, mediaId: media.id }) ?                
                  <TurnedInIcon className="favorite-icon" sx={{ fontSize: "2.5rem", opacity: ".5", "&:hover": { opacity: 1 } }} />
                  : <TurnedInNotIcon className="favorite-icon" sx={{ fontSize: "2.5rem", opacity: ".5", "&:hover": { opacity: 1 } }} />}
              </LoadingButton>


              <Box className="media-back-drop" sx={{
                opacity: { xs: 1, md: 0 },
                transition: "all 0.3s ease",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                backgroundImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))"
              }} />
              <Button
                className="media-play-btn"
                variant="outlined"
                startIcon={<PlayArrowIcon />}
                sx={{
                  display: { xs: "none", md: "flex" },
                  opacity: 0,
                  transition: "all 0.3s ease",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  "& .MuiButton-startIcon": { marginRight: "-4px" }
                }}
              />
              <Box
                className="media-info"
                sx={{
                  transition: "all 0.3s ease",
                  opacity: { xs: 1, md: 0 },
                  position: "absolute",
                  bottom: { xs: 0, md: "-20px" },
                  width: "100%",
                  height: "max-content",
                  boxSizing: "border-box",
                  padding: { xs: "10px", md: "2rem 1rem" }
                }}
              >
                <Stack spacing={{ xs: 1, md: 2 }}>
                  {rate && <CircularRate value={rate} />}

                  <Typography>{releaseDate}</Typography>

                  <Typography
                    variant="body1"
                    fontWeight="700"
                    sx={{
                      fontSize: "1rem",
                      ...uiConfigs.style.typoLines(1, "left")
                    }}
                  >
                    {title}
                  </Typography>
                </Stack>
              </Box>
            </>
          )}
          {/* movie or tv item */}

          {/* people */}
          {mediaType === "people" && (
            <Box sx={{
              position: "absolute",
              width: "100%",
              height: "max-content",
              bottom: 0,
              padding: "10px",
              backgroundColor: "rgba(0,0,0,0.6)"
            }}>
              <Typography sx={{ ...uiConfigs.style.typoLines(1, "left") }}>
                {media.name}
              </Typography>
            </Box>
          )}
          {/* people */}
        </Box>
      </Box>
    </Link>
  );
};

export default MediaItem;