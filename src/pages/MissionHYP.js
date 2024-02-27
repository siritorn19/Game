import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography, Box } from "@mui/material";
import queryString from "query-string";
import HowtoPlay from "../components/HowtoPlay";
import PopupQRReuse from "../components/AlertqrReuse";
import Hunt01 from "../imges/hyp/Biggy-Treasure-Hunt-01.jpg";
import Hunt02 from "../imges/hyp/Biggy-Treasure-Hunt-02.jpg";
import Hunt03 from "../imges/hyp/Biggy-Treasure-Hunt-03.jpg";
import Hunt04 from "../imges/hyp/Biggy-Treasure-Hunt-04.jpg";
import Hunt05 from "../imges/hyp/Biggy-Treasure-Hunt-05.jpg";
import Hunt06 from "../imges/hyp/Biggy-Treasure-Hunt-06.jpg";
import Hunt07 from "../imges/hyp/Biggy-Treasure-Hunt-07.jpg";

const MissionHYP = () => {
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
      // console.log(`userLineId-: ${userId}`);
      const missionResponse = await axios.get(
        `https://line-game-treasure-hunt-api-stg-aedsyeswba-as.a.run.app/process/getallprocess/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setStatus(missionResponse.data.status);
      console.log("get :", missionResponse);

      if (missionResponse.data.status === "success") {
        setMissionData(missionResponse.data.data);
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
        } else if (checkinResponse.data.status === "success") {
          if (checkinResponse.data.message === "get reward") {
            setError(checkinResponse.data.message);
            console.log("Reward received!"); // Add this line
          } else if (checkinResponse.data.message === "success") {
            setError(checkinResponse.data.message);
            window.location.reload();
          } else {
            console.log("Check-in successful");
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const imageUrls = {
    1: Hunt01,
    2: Hunt02,
    3: Hunt03,
    4: Hunt04,
    5: Hunt05,
    6: Hunt06,
    7: Hunt07,
  };


  return (
    <div>
      <Grid sx={{ m: 1 }}>
        {/* <div>
          <h2>Total QR Codes: {processData.length}</h2>
          {processData.map((process, index) => (
            <div key={index}>
              <p>QR Code ID: {process.qr_code_id}</p>
              <p>Check Point Name: {process.check_point_name}</p>
              <p>Time Stamp: {process.time_stamp}</p>
              <hr />
            </div>
          ))}
        </div> */}
        <Grid item xs={12} sx={{ mb: 2, mt: 3 }}>
          <Typography fontSize={22} color="#ed1c24" align="center">
            <b>
              {" "}
              Biggy Hunt Challenge <br />
              นักช้อป มือโปร!! ตามล่าหาขุมสมบัติ
            </b>
          </Typography>
        </Grid>

        <Grid container>
          {[1, 2, 3, 4, 5, 6, 7].map((stageNumber) => {
            const mission = missionData.find(
              (mission) => mission.check_point_name === `stage ${stageNumber}`
            );

            // Define the logo image URL
            const logoImageUrl =
              "https://png.pngtree.com/png-vector/20220614/ourmid/pngtree-vector-completed-stamp-illustration-background-grunge-vector-png-image_13888860.png"; // Update this with your logo image URL
            return (
              <Grid item xs={stageNumber === 1 ? 12 : 4} key={stageNumber}>
                <div
                  style={{
                    width: "100%", // Default width for stages other than stage 1
                    height: stageNumber === 1 ? "120px" : "120px", // Adjusted height for stage 1
                    border: "none",
                    background: `url(${imageUrls[stageNumber]}) center/cover no-repeat `,
                    // background: mission
                    //   ? `url(${imageUrls[stageNumber]}) center/cover no-repeat `
                    //   : "lightgrey",
                  }}
                >
                  {mission ? (
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
                      // sx={{ borderRadius: 6 }}
                    />
                  ) : (
                    <Typography
                      sx={{
                        fontsize: 14,
                        textDecoration: "none",
                        fontFamily: "Prompt",
                        p: 1,
                        color: "#ed1c24",
                      }}
                    >
                      Stage {stageNumber}
                    </Typography>
                  )}
                </div>
              </Grid>
            );
          })}
        </Grid>
        {error && <PopupQRReuse message={error} />}
      </Grid>

      {/* วิธีเล่น */}
      <Grid sx={{ m: 2 }}>
        <HowtoPlay />
      </Grid>
    </div>
  );
};

export default MissionHYP;
