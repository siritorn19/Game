import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Button, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import banner from "../imges/banner.jpg";
import queryString from "query-string";
import BigCLoading from "../components/Loading";

const Home = () => {
  useEffect(() => {
    const params = queryString.parse(window.location.search);
    if (params.qr) {
      redirectToMission(params.qr);
    }
  }, []);

  const redirectToMission = (qr) => {
    let missionUrl;
    if (
      qr === "B2iSLO" ||
      qr === "Yn75EO" ||
      qr === "13YZD3" ||
      qr === "IgsdWE" ||
      qr === "skvi69" ||
      qr === "aKvg6N" ||
      qr === "wMPC7B"
    ) {
      missionUrl = `/missionhyp/?qr=${qr}`;
    } else if (qr === "5XRMgB") {
      missionUrl = `/mainmission/?qr=${qr}`;
    }
    else{
      missionUrl = `/mainmission`;
    }
    /*
    if (p === "hyp") {
      missionUrl = "/missionhyp";
    } else if (p === "mini") {
      missionUrl = "/missionbcm";
    }*/
    if (missionUrl) {
      window.location.href = missionUrl;
    }
  };
  return (
    <BigCLoading/>
  );
};

export default Home;
