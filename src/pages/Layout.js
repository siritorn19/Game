import * as React from "react";
import { Grid, Typography, Box, IconButton, Link } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import HowtoPlay from "../components/HowtoPlay";

import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "../components/NavBar";
import BigCLoading from "../components/Loading";

import "./Layout.css";

function Layout(props) {
  const userId = sessionStorage.getItem("userId");
  const userName = sessionStorage.getItem("userName");
  const userLineId = sessionStorage.getItem("userLineId");
  const pictureUrl = sessionStorage.getItem("pictureUrl");

  if (userId === null) {
    return <BigCLoading />;
  } else {
    return (
      <>
        <Navbar
          userName={userName}
          userLineId={userLineId}
          pictureUrl={pictureUrl}
        />
        {props.children}
        <Grid sx={{ m: 2 }}>
          <HowtoPlay />
        </Grid>
      </>
    );
  }
}
export default Layout;
