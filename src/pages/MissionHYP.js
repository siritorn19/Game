import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography, Box, IconButton, Link } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import HowtoPlay from "../components/HowtoPlay";
import PopupQRReuse from "../components/AlertqrReuse";
import PopupAward from "../components/AleartAward";
import Hunt01 from "../imges/hyp/Biggy-Treasure-Hunt-01.jpg";
import Hunt02 from "../imges/hyp/Biggy-Treasure-Hunt-02.jpg";
import Hunt03 from "../imges/hyp/Biggy-Treasure-Hunt-03.jpg";
import Hunt04 from "../imges/hyp/Biggy-Treasure-Hunt-04.jpg";
import Hunt05 from "../imges/hyp/Biggy-Treasure-Hunt-05.jpg";
import Hunt06 from "../imges/hyp/Biggy-Treasure-Hunt-06.jpg";
import Hunt07 from "../imges/hyp/Biggy-Treasure-Hunt-07.jpg";
import BiggyHead from "../imges/BiggyHead.png";

const MissionHYP = () => {
  const [missionData, setMissionData] = useState([]);
  const [status, setStatus] = useState("");
  const [processData, setProcessData] = useState([]);
  const [error, setError] = useState(null);
  const [award, setAward] = useState(null);
  const userId = sessionStorage.getItem("userId");
  const [rewardData, setRewardData] = useState(null);
  const [rewardFetched, setRewardFetched] = useState(false);
  const history = useHistory();

  const params = queryString.parse(window.location.search);
  const qr = params.qr;

  useEffect(() => {
    fetchData();
    if (setMissionData || qr) {
      fetchReward(userId);
    }
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
          setError("คุณได้แสกนเรียบร้อยแล้ว");
        } else if (checkinResponse.data.status === "success") {
          if (checkinResponse.data.message === "get reward") {
            // setAward("ยินดีด้วย คุณรับรางวัลแล้ว");
            console.log("Reward received!");
            if (!rewardFetched) {
              await fetchReward(userId);
              setRewardFetched(true);
            }
          } else if (checkinResponse.data.message === "success") {
            setError("ยินดีด้วย คุณสะสมได้อีก 1 จุดแล้ว");
            window.location.reload();
          } else {
            console.log("Check-in successful");
          }
        }
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  //reward
  const fetchReward = async () => {
    try {
      await fetchData().then(() => {
        if (!missionData) {
          console.log("bigpointId is null");
          return;
        }
        const bigpointId =
          missionData.bigpoint_id === null ? "null" : missionData.bigpoint_id;
        const requestData = {
          userId: userId,
          rewardType: 1,
          bigpointId: bigpointId,
        };
        console.log("Data sent to API:", requestData);

        axios
          .post(
            `https://line-game-treasure-hunt-api-stg-aedsyeswba-as.a.run.app/reward/getreward/`,
            requestData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log("Response data:", response.data);
            if (response.data.status === "success") {
              setRewardData(response.data);
              setTimeout(() => {
                console.log("response message:", response.data.message); // Log error message
                setAward("ยินดีด้วย คุณสะสมได้อีก 1 จุดแล้ว");
              }, 5000);
            } else {
              // handle error
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      });
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

  const navigateToMainMission = () => {
    history.push("/mainmission");
  };

  return (
    <div>
      <Grid sx={{ m: 1 }}>
        <IconButton onClick={navigateToMainMission}>
          <ArrowBackIosIcon sx={{ stroke: "#ed1c24", strokeWidth: 2 }} />
        </IconButton>
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
        <Grid item xs={12} sx={{ mb: 2, mt: 1 }}>
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
            return (
              <Grid item xs={stageNumber === 1 ? 12 : 4} key={stageNumber}>
                <a href="/scanqr">
                  <div
                    style={{
                      width: "100%",
                      height: stageNumber === 1 ? "120px" : "120px",
                      border: "none",
                      background: `url(${imageUrls[stageNumber]}) center/cover no-repeat `,
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
                        src={BiggyHead}
                        width="100px"
                        height="100px"
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
                        {/* Stage {stageNumber} */}
                      </Typography>
                    )}
                  </div>
                </a>
              </Grid>
            );
          })}
        </Grid>
        {error && <PopupQRReuse message={error} />}
        {award && <PopupAward message={award} />}
      </Grid>

      {/* วิธีเล่น */}
      <Grid sx={{ m: 2 }}>
        <HowtoPlay />
      </Grid>
    </div>
  );
};

export default MissionHYP;
