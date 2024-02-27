import React from "react";
import { Link } from "react-router-dom";
import { Grid, Box, Typography, Button } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

function HowtoPlay() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="start"
      textAlign="center"
      sx={{
        mt: 10,
        ml: 0.3,
        mr: 1,
      }}
    >
      <Button
        variant="contained"
        style={{
          borderRadius: 30,
          backgroundColor: "#93d701",
          padding: "4px 30px",
          fontSize: "18px",
          fontFamily: "Prompt",
        }}
      >
        วิธีเล่น
      </Button>

      <Grid
        container
        spacing={1}
        sx={{ borderRadius: 5, p: 2, backgroundColor: "grey.200",  }}
      >
        <Grid item xs={4}>
          <Link to="/scanqr">
            <CameraAltIcon sx={{ fontSize: 50, color: "#000" }} />
          </Link>
        </Grid>
        <Grid item xs={8}>
          <Typography sx={{ textDecoration: "none", fontFamily: "Prompt" }}>
            กดกล้องเพื่อสแกน QR Code ตามจุดที่กำหนด
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default HowtoPlay;
