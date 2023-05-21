import { Grid } from "@mui/material";
import MediaItem from "./MediaItem";

const MediaGrid = ({ medias, mediaType }) => {
  return (
    <Grid container spacing={{xs:3,lg:4}} >
      {medias.map((media, index) => (
        <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MediaGrid;