import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Grid, Box, Typography } from "@mui/material";
import banner_hyp from "../imges/banner-hyp.jpg";
import banner_bcm from "../imges/banner-bcm.jpg";
import HowtoPlay from "../components/HowtoPlay";

const MainMission = () => {
  const [processData, setProcessData] = useState([]);
  const [stageCount, setStageCount] = useState(0);
  const [stage8Count, setStage8Count] = useState(0);
  const userId = sessionStorage.getItem("userId");


  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(`Main : ${userId}`);
        const response = await fetch(
          `https://line-game-treasure-hunt-api-stg-aedsyeswba-as.a.run.app/process/getallprocess/${userId}`
        );
        const result = await response.json();

        // Separate data for stages 1-7 and stage 8
        const stages1to7 = result.data.filter(
          (process) =>
            process.check_point_name.startsWith("stage") &&
            !process.check_point_name.endsWith("7")
        );
        const stage8 = result.data.filter(
          (process) => process.check_point_name === "stage Big C mini"
        );

        // Set stage counts
        setStageCount(stages1to7.length);
        setStage8Count(stage8.length);

        // Set processData state
        setProcessData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <Grid sx={{ m: 1 }}>
      <Grid item xs={12} sx={{ mb: 2, mt: 2 }}>
        <Typography fontSize={22} color="#ed1c24" align="center">
          <b>
            {" "}
            Biggy Hunt Challenge <br />
            นักช้อป มือโปร!! ตามล่าหาขุมสมบัติ
          </b>
        </Typography>
      </Grid>

      {/* HYP */}
      <Link to="./MissionHYP" style={{ textDecoration: "none" }}>
        <Grid
          container
          sx={{
            backgroundImage: `url(${banner_hyp})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "180px",
            width: "100%",
            borderRadius: 3,
            mt: 3,
          }}
        >
          <div style={{ width: "100%" }}>
            <Box display="flex" justifyContent="flex-end" m={2} p={1}>
              <Box p={1}>
                <Typography
                  fontSize={24}
                  color="#ed1c24"
                  align="center"
                  sx={{ fontFamily: "Prompt" }}
                >
                  แสกนแล้ว{" "}
                </Typography>
                <Typography
                  fontSize={24}
                  fontWeight={800}
                  color="#ed1c24"
                  align="center"
                  sx={{ fontFamily: "Prompt" }}
                >
                  {stageCount}/7
                </Typography>
              </Box>
            </Box>
          </div>
        </Grid>
      </Link>

      {/* mini */}
      <Link to="./MissionBCM" style={{ textDecoration: "none" }}>
        <Grid
          container
          sx={{
            backgroundImage: `url(${banner_bcm})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "180px",
            width: "100%",
            mt: 3,
            borderRadius: 3,
          }}
        >
          <div style={{ width: "100%" }}>
            <Box display="flex" justifyContent="flex-end" m={2} p={1}>
              <Box p={1}>
                <Typography
                  fontSize={24}
                  color="#ed1c24"
                  align="center"
                  sx={{ fontFamily: "Prompt" }}
                >
                  แสกนแล้ว{" "}
                </Typography>
                <Typography
                  fontSize={24}
                  fontWeight={800}
                  color="#ed1c24"
                  align="center"
                  sx={{ fontFamily: "Prompt" }}
                >
                  {stage8Count}/1
                </Typography>
              </Box>
            </Box>
          </div>
        </Grid>
      </Link>

      {/* วิธีเล่น */}
      <HowtoPlay />
    </Grid>
  );
};

export default MainMission;
