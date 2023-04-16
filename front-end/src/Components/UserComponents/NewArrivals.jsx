  import { Typography } from "@mui/material";
  import { Box } from "@mui/system";
import React from "react";

const NewArrivals = (props) => {
  return (
    <div>
      <Box
        maxWidth
        sx={{
          bgcolor: "#E9E8E8",
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="h4"
          fontWeight={{ xs: 400, sm: 500, md: 600, lg: 800 }}
          my={{ xs: 0.5, sm: 1, md: 1.6, lg: 2 }}
          sx={{
            fontFamily: "Inria Serif",
            color: "primary.main",
          }}
        >
          {/* New Arriavals */}
          {props.text}
        </Typography>
      </Box>
    </div>
  );
};

export default NewArrivals;
