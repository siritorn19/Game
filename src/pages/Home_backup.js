import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Button, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import banner from "../imges/banner.jpg";
import queryString from "query-string";

const Home = () => {
  useEffect(() => {
    const params = queryString.parse(window.location.search);
    if (params.p) {
      redirectToMission(params.p);
    }
  }, []);

  const redirectToMission = (p) => {
    let missionUrl;
    if (p === "hyp") {
      missionUrl = "/missionhyp";
    } else if (p === "mini") {
      missionUrl = "/missionbcm";
    }
    if (missionUrl) {
      window.location.href = missionUrl;
    }
  };

  return (
    <Grid>
      <Grid item xs={12} sx={{ mb: 2, mt: 2 }}>
        <Typography fontSize={24} color="#ed1c24" align="center">
          <b>เกมลุ้นรางวัล</b>
        </Typography>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "",
            width: "100%",
            height: "auto",
            mt: 3,
          }}
        >
          {/* Btn วิธีเล่นเกม */}
          <Button
            href="https://bigc-gamification-stg.web.app/reward"
            variant="contained"
            style={{
              borderRadius: 30,
              backgroundColor: "#93d701",
              padding: "6px 20px",
              fontSize: "16px",
              fontWeight: "600",
              fontFamily: "Prompt",
              border: 2,
              borderColor: "#fff",
              textDecoration: "none",
              mr: 2,
            }}
          >
            วิธีเล่นเกม
          </Button>

          {/* รางวัลของฉัน */}
          <Button
            href="https://bigc-gamification-stg.web.app/reward"
            variant="contained"
            style={{
              borderRadius: 30,
              backgroundColor: "#ed1c24",
              padding: "6px 20px",
              fontSize: "16px",
              fontWeight: "600",
              fontFamily: "Prompt",
              border: 2,
              borderColor: "#fff",
              mr: 3,
              textDecoration: "none",
            }}
          >
            รางวัลของฉัน
          </Button>
        </Box>
      </Grid>

      {/* Banner */}
      <Grid sx={{ mt: 3 }}>
        <Box
          component="img"
          alt="BigC"
          src={banner}
          height="230px"
          textAlign="center"
          sx={{ borderRadius: 6 }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            width: "100%",
            height: "auto",
            mt: -3,
          }}
        >
          {/* Btn */}
          <Link to="./MainMission" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              style={{
                borderRadius: 30,
                backgroundColor: "#ed1c24",
                padding: "10px 40px",
                fontSize: "18px",
                fontWeight: "600",
                fontFamily: "Prompt",
                border: 2,
                borderColor: "#fff",
              }}
            >
              เล่นเกม
              <ArrowRightIcon />
            </Button>
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
