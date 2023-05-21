import { Box, Typography, Stack, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";

import PersonMediaGrid from "../components/common/PersonMediaGrid";
import Container from "../components/common/Container";

import tmdbConfigs from "../api/configs/tmdb.configs";
import uiConfigs from "../configs/ui.configs";
import personApi from "../api/modules/person.api";

const PersonDetail = () => {
  const theme = useTheme();
  const { personId } = useParams();
  const [person, setPerson] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const getPerson = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await personApi.detail({ personId });
      dispatch(setGlobalLoading(false));

      if (err) toast.error(err.message);
      if (response) setPerson(response);
    };

    getPerson();
  }, [personId]);

  return (
    <>
      {person && (
        <><Box sx={{
          color: "primary.contrastText",
          ...uiConfigs.style.mainContent
        }}>
          <Box sx={{ ...uiConfigs.style.mainContent }}>
            <Box sx={{
              position: "relative",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center"
            }}>
              <Box sx={{
                width: { xs: "50%", md: "20%" }
              }}>
                <Box sx={{
                  paddingTop: "160%",
                  borderRadius: "1rem",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: `${theme.palette.background.paper}`,
                  backgroundImage: `url(${person.profile_path ? tmdbConfigs.posterPath(person.profile_path) : "https://us.123rf.com/450wm/solarus/solarus2111/solarus211100266/177673320-aucune-ic%C3%B4ne-de-vecteur-de-photo-disponible-symbole-d-image-par-d%C3%A9faut-image-bient%C3%B4t-disponible.jpg?ver=6"})`
                }} />
              </Box>
              <Box sx={{
                width: { xs: "100%", md: "80%" },
                padding: { xs: "1rem 0", md: "1rem 2rem" }
              }}>
                <Stack spacing={2}>
                  <Typography variant="h4" fontWeight="700">
                    {`${person.name} (${person.birthday && person.birthday.split("-")[0]}`}
                    {person.deathday && ` - ${person.deathday && person.deathday.split("-")[0]}`}
                    {")"}
                  </Typography>

                  <Typography variant="h6">
                    {person.place_of_birth}
                  </Typography>

                  <Typography sx={{ ...uiConfigs.style.typoLines(10) }}>
                    {person.biography}
                  </Typography>
                </Stack>
              </Box>
            </Box>
            <Container header="medias">
              <PersonMediaGrid personId={personId} />
            </Container>
          </Box>
        </Box>
        </>
      )}
    </>
  );
};

export default PersonDetail;