import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Button, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import banner from "../imges/banner.jpg";
import queryString from "query-string";
import BigCLoading from "../components/Loading";

const Home = () => {
  const userId = sessionStorage.getItem("userId");
  //console.log(userId);

  const urlParams = new URLSearchParams(window.location.search);
  //console.log(urlParams);

  const qr = urlParams.get("qr");
  const m = urlParams.get("m");
  const p = urlParams.get("p");
  console.log(qr, m, p);

/*  useEffect(() => {
    if (qr) {
      redirectHomeToMission(qr);
    } else {
      redirectHomeToMission("");
    }
  }, []);
*/
useEffect(() => {
  if(userId != null){
    if (qr) {
      console.log(`userId: ${qr}`);
      redirectHomeToMission(qr);
    } else {
      redirectHomeToMission("");
    }
  }
}, [userId]);
  
  let redirectHomeToMission = (qr) => {
    console.log(`redirectToMission: ${qr}`);
    //window.location.href = '/missionhyp?qr=wMPC7B';
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
      window.location.href=`/missionhyp?qr=${qr}`;
    } else if (qr === "5XRMgB") {
      window.location.href=`/mainmission?qr=${qr}`;
    } else {
      window.location.href="/mainmission";
    }
    console.log(`missionUrl : ${missionUrl}`);
    /*
    if (p === "hyp") {
      missionUrl = "/missionhyp";
    } else if (p === "mini") {
      missionUrl = "/missionbcm";
    }*/
    if (missionUrl) {
      //window.location.href=missionUrl;
    }
  };
  return <BigCLoading />;
};

export default Home;
