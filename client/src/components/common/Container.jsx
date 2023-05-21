import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import uiConfigs from '../../configs/ui.configs';

const sidebarWith = uiConfigs.size.sidebarWith;
const Container = ({ header, children }) => {
  return (
    <Box sx={{
      color: "text.primary",
      maxWidth: { xs: '100%', md: `calc(100vw - ${sidebarWith})` },
      paddingX: "1.5rem",
      marginY: "2.5rem"
    }}>
      <Stack spacing={4}>
        {header && (
          <Box sx={{
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "100%",
              height: "2px",
              width: "100px",
              backgroundColor: "primary.main"
            }
          }}>
            <Typography
              fontWeight="400"
              textTransform="capitalize"
              fontSize={{
                xs: "1.4rem", sm: "1.5rem", lg: "2rem"
              }}>
              {header}
            </Typography>
          </Box>
        )}
        {children}
      </Stack>
    </Box>
  );
};

export default Container;