import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Grid, Box, Typography } from "@mui/material";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import PopupQRReuse from "../components/AlertqrReuse";
import PopupAward from "../components/AleartAward";
import PopupAwardMini from "../components/AleartAwardBigcMini";
import HowtoPlay from "../components/HowtoPlay";
import BiggyHead from "../imges/BiggyHead.png";
import Lottie from "lottie-react";
import WalkAnimation from "../helpper/Animation_1.json";
import hyp from "../imges/1hyp.jpg";
import bcm from "../imges/2mini.jpg";
import mainBg from "../imges/main-bg.jpg";
import cam from "../imges/cam.png";
import Layout from "./Layout";

import "./MainMission.css";

const MainMission = () => {
  const userId = sessionStorage.getItem("userId");
  const bigpointId = sessionStorage.getItem("bigpointId");

  const [processData, setProcessData] = useState([]);
  const [stageCount, setStageCount] = useState(0);
  const [stage8Count, setStage8Count] = useState(0);
  const [missionData, setMissionData] = useState([]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const [award, setAward] = useState(null);
  const [userData, setUserData] = useState(null);
  const [rewardData, setRewardData] = useState(null);
  const [rewardFetched, setRewardFetched] = useState(false);
  const history = useHistory();

  /*useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/process/getallprocess/${userId}`
        );
        const result = await response.json();

        const stages1to7 = result.data.filter(
          (process) =>
            process.check_point_name.startsWith("stage") &&
            !process.check_point_name.endsWith("7")
        );
        const stage8 = result.data.filter(
          (process) => process.check_point_name === "stage Big C mini"
        );

        const stageCount = stages1to7.filter(
          (process) => process.check_point_type === 1
        ).length;
        const stage8Count = stage8.filter(
          (process) => process.check_point_type === 2
        ).length;

        // Set stage counts
        setStageCount(stageCount);
        setStage8Count(stage8Count);

        // Set processData state
        setProcessData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userId]);*/

  // scan mini
  const params = queryString.parse(window.location.search);
  const qr = params.qr;

  useEffect(() => {
    if (userId != null) {
      fetchData();
    }
    /*if (setMissionData || qr) {
      fetchReward(userId);
    }*/
  }, []);

  const fetchData = async () => {
    try {
      const missionResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/process/getallprocess/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setStatus(missionResponse.data.status);
      if (missionResponse.data.status === "success") {
        setMissionData(missionResponse.data.data);
        setProcessData(missionResponse.data);

        const countHyp = missionResponse.data.data.filter(
          (mission) => mission.check_point_type === 1
        ).length;
        const countMini = missionResponse.data.data.filter(
          (mission) => mission.check_point_type === 2
        ).length;
        setStageCount(countHyp);
        setStage8Count(countMini);
      }
      

      if (qr) {
        const checkinResponse = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/process/checkin/`,
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
        setAward(null);
        setError(null);

        if (checkinResponse.data.status === "error") {
          setError("ขออภัย! คุณเคยแสกนจุดนี้แล้ว");
        } else if (
          checkinResponse.data.status === "success" &&
          checkinResponse.data.message === "get reward for bigC mini"
        ) {
          if (!rewardFetched) {
            await fetchReward(userId);
            setRewardFetched(true);
          }
          // setAward("ยินดีด้วย คุณสะสมได้อีก 1 จุดแล้ว");
          // window.location.reload();
        } else {
          //console.log("ยินดีด้วย คุณสะสมได้อีก 1 จุดแล้ว");
        }
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const fetchReward = async () => {
    try {
      //await fetchData().then(() => {
        /*if (!missionData) {
          console.log("bigpointId is null");
          return;
        }
        const bigpointId = missionData.bigpoint_id === null ? "null" : missionData.bigpoint_id;
        */
        const requestData = {
          userId: userId,
          rewardType: 2,
          bigpointId: bigpointId,
        };
        console.log("Data sent to API:", requestData);

        axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/reward/getreward/`,
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
              //setTimeout(() => {
                console.log("response message:", response.data.message); // Log error message
                setAward("ส่วนลดซื้อสินค้ามูลค่า 30 บาท");
              //}, 5000);
            } else {
              // handle error
            }
          })
          .catch((error) => {
            console.log("Error fetching data:", error);
          });
      //});
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <Layout>
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

      <Grid item xs={12}>
        <Box
          className="Main-Hunt-Box"
          sx={{
            background: `url(${mainBg}) center/cover no-repeat`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          {/* animate */}
          <Box className="Main-Hunt-animate-Box">
            <Lottie
              animationData={WalkAnimation}
              loop={true}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
            />
          </Box>
          <Box className="Main-Hunt-TopLayer-Box">
            {/* HYP */}
            <Link to="/missionhyp" style={{ textDecoration: "none" }}>
              <Box className="Main-Hunt-HYP-Box">
                <Box className="Main-BiggyHead-Box">
                  {stageCount >= 6 ? <img src={BiggyHead} alt="BigC" /> : ""}
                </Box>
                <Box className="Main-Counter-Box">
                  <Typography
                    fontSize={20}
                    color="#ed1c24"
                    align="center"
                    sx={{
                      fontFamily: "Prompt",
                      textDecoration: "none",
                    }}
                  >
                    แสกนแล้ว{" "}
                  </Typography>
                  <Typography
                    fontSize={20}
                    fontWeight={800}
                    color="#ed1c24"
                    align="center"
                    sx={{ fontFamily: "Prompt" }}
                  >
                    {stageCount}/7
                  </Typography>
                </Box>
              </Box>
            </Link>

            {/* BCM */}
            <Link to="/scanqr" style={{ textDecoration: "none" }}>
              <Box className="Main-Hunt-MINI-Box">
                {[1].map((stageNumber) => {
                  const mission = missionData.find(
                    (mission) => mission.check_point_name === "stage Big C mini"
                  );
                  return (
                    <Box>
                      <Box className="Main-BiggyHead-Box">
                        {mission &&
                          mission.check_point_name === "stage Big C mini" && (
                            <img src={BiggyHead} alt="BigC" />
                          )}
                      </Box>
                      <Box className="Main-Counter-Box">
                        <Typography
                          fontSize={20}
                          color="#ed1c24"
                          align="center"
                          sx={{
                            fontFamily: "Prompt",
                            textDecoration: "none",
                          }}
                        >
                          แสกนแล้ว{" "}
                        </Typography>
                        <Typography
                          fontSize={20}
                          fontWeight={800}
                          color="#ed1c24"
                          align="center"
                          sx={{ fontFamily: "Prompt" }}
                        >
                          {stage8Count}/1
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
                <Box className="Main-Camera-Box">
                  <img src={cam} alt="BigC" />
                </Box>
              </Box>
            </Link>
          </Box>
        </Box>
      </Grid>

      <div style={{ width: "100%" }}>
        {error && <PopupQRReuse message={error} page="Main"/>}
        {/*{award && <PopupAward message={award} />}*/}
        {award && <PopupAwardMini message={award} />}
      </div>
    </Grid>
    </Layout>
  );
};

export default MainMission;
