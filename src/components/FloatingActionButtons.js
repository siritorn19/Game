import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
// import CameraAltIcon from "@mui/icons-material/CameraAlt";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { Zoom, Typography } from "@mui/material";

export default function FloatingActionButtons() {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 60,
        right: 40,
      }}
    >
      <Zoom in={true} timeout={{ enter: 500, exit: 500 }} unmountOnExit
      sx = {{ background: "#93d701" }}
      >
        <Fab color="success" variant="extended" href="/App"
        sx={{ p:4}}
        >
          <QrCodeScannerIcon /> 
          <Typography  sx={{ ml:1, fontWeight: 500,  fontSize: "18px" }}>Scan</Typography>
        </Fab>
      </Zoom>
    </Box>
  );
}
