import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography, Box } from "@mui/material";
import queryString from "query-string";
import HowtoPlay from "../components/HowtoPlay";
import PopupQRReuse from "../components/AlertqrReuse";
import Hunt01 from "../imges/hyp/Biggy-Treasure-Hunt-01.jpg";

const MissionBCM = () => {
  const [missionData, setMissionData] = useState([]);
  const [status, setStatus] = useState("");
  const [processData, setProcessData] = useState([]);
  const [error, setError] = useState(null);
  const userId = sessionStorage.getItem("userId");

  const params = queryString.parse(window.location.search);
  const qr = params.qr;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // console.log(`userId BCM:${userId}`);
      const missionResponse = await axios.get(
        `https://line-game-treasure-hunt-api-stg-aedsyeswba-as.a.run.app/process/getallprocess/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setStatus(missionResponse.data.status);
      //   console.log("get :", missionResponse);

      if (missionResponse.data.status === "success") {
        setMissionData(missionResponse.data.data);
        // setError(missionResponse.data.message)
      }
      // const result = await response.json();
      setStatus(missionResponse.status);
      if (missionResponse.status === "success") {
        setMissionData(missionResponse.data);
        setProcessData(missionResponse.data);
      }

      // Send check-in request if qr param exists
      if (qr) {
        const checkinResponse = await axios.post(
          "https://line-game-treasure-hunt-api-stg-aedsyeswba-as.a.run.app/process/checkin/",
          {
            userId: userId,
            qrCodeId: qr,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("post: ", checkinResponse);
        if (checkinResponse.data.status === "error") {
          setError(checkinResponse.data.message);
        } else if (
          checkinResponse.data.status === "success" ||
          checkinResponse.data.message === "get reward for bigC mini"
        ) {
          console.log("get reward for bigC mini"); // Add this line
          setError(checkinResponse.data.message);
          window.location.reload();
        } else {
          console.log("Check-in Mini successful");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <Grid sx={{ m: 1 }}>
        <Grid item xs={12} sx={{ mb: 2, mt: 3 }}>
          <Typography fontSize={22} color="#ed1c24" align="center">
            <b>
              Biggy Hunt Challenge <br />
              นักช้อป มือโปร!! ตามล่าหาขุมสมบัติ
            </b>
          </Typography>
        </Grid>
        <Grid container="true">
          {[1].map((stageNumber) => {
            const mission = missionData.find(
              (mission) => mission.check_point_name === "stage Big C mini"
            );

            // Define the logo image URL
            const logoImageUrl =
              "https://png.pngtree.com/png-vector/20220614/ourmid/pngtree-vector-completed-stamp-illustration-background-grunge-vector-png-image_13888860.png"; // Update this with your logo image URL
            return (
              <Grid item xs={12} key={stageNumber}>
                <div
                  style={{
                    width: "100%", // Default width for stages other than stage 1
                    height: stageNumber === 1 ? "120px" : "120px", // Adjusted height for stage 1
                    border: "none",
                    background: `url(${Hunt01}) center/cover no-repeat`,
                  }}
                >
                  {mission &&
                    mission.check_point_name === "stage Big C mini" && (
                      <Box
                        container
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        component="img"
                        alt="BigC"
                        src={logoImageUrl}
                        width="80px"
                        height="70px"
                        textAlign="center"
                        justify="center"
                      />
                    )}
                </div>
              </Grid>
            );
          })}
        </Grid>
        {error && <PopupQRReuse message={error} />}
      </Grid>
      <Grid sx={{ m: 2 }}>
        {/* วิธีเล่น */}
        <HowtoPlay />
      </Grid>
    </div>
  );
};

export default MissionBCM;
