import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Grid, Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import PopupQRReuse from "../components/AlertqrReuse";
import banner_hyp from "../imges/banner-hyp.jpg";
import banner_bcm from "../imges/banner-bcm.jpg";
import HowtoPlay from "../components/HowtoPlay";
import Hunt01 from "../imges/hyp/Biggy-Treasure-Hunt-01.jpg";
import BiggyHead from "../imges/BiggyHead.png";

const MainMission = () => {
  const [processData, setProcessData] = useState([]);
  const [stageCount, setStageCount] = useState(0);
  const [stage8Count, setStage8Count] = useState(0);
  const userId = sessionStorage.getItem("userId");

  const [missionData, setMissionData] = useState([]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [rewardData, setRewardData] = useState(null);
  const [rewardFetched, setRewardFetched] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://line-game-treasure-hunt-api-stg-aedsyeswba-as.a.run.app/process/getallprocess/${userId}`
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

        // Set stage counts
        setStageCount(
          stages1to7.filter((process) => process.check_point_type === 1).length
        );
        setStage8Count(
          stage8.filter((process) => process.check_point_type === 2).length
        );

        // Set processData state
        setProcessData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userId]);

  // scan mini
  const params = queryString.parse(window.location.search);
  const qr = params.qr;

  useEffect(() => {
    fetchData();
    if (setMissionData) {
      fetchReward(userId);
    }
  }, []);

  const fetchData = async () => {
    try {
      const missionResponse = await axios.get(
        `https://line-game-treasure-hunt-api-stg-aedsyeswba-as.a.run.app/process/getallprocess/${userId}`,
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
      }

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
        // console.log("post: ", checkinResponse);
        if (checkinResponse.data.status === "error") {
          setError(checkinResponse.data.message);
        } else if (
          checkinResponse.data.status === "success" ||
          checkinResponse.data.message === "get reward for bigC mini"
        ) {
          console.log("get reward for bigC mini");
          setError(checkinResponse.data.message);
          if (!rewardFetched) {
            await fetchReward(userId);
            setRewardFetched(true);
          }
          //   window.location.reload();
        } else {
          console.log("Check-in Mini successful");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
          rewardType: 2,
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
              setError(response.data.message);
              setTimeout(() => {
                console.log("response message:", response.data.message); // Log error message
                setError(response.data.message); // Update error state
              }, 3000);
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
      {/* <Link to="/scanqr" style={{ textDecoration: "none" }}>
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
            textDecoration: "none",
          }}
        >
          <div style={{ width: "100%" }}>
            <Box display="flex" justifyContent="flex-end" m={2} p={1}>
              <Box p={1}>
                <Typography
                  fontSize={24}
                  color="#ed1c24"
                  align="center"
                  sx={{ fontFamily: "Prompt", textDecoration: "none" }}
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
      </Link> */}

      <Grid sx={{ m: 1 }}>
        <Grid container>
          {[1].map((stageNumber) => {
            const mission = missionData.find(
              (mission) => mission.check_point_name === "stage Big C mini"
            );

            return (
              <Grid item xs={12} key={stageNumber} >
                <a href="/scanqr">
                  <Grid
                    container
                    sx={{
                      background: `url(${banner_bcm}) center/cover no-repeat`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      height: "180px",
                      width: "100%",
                      mt: 3,
                      borderRadius: 3,
                      textDecoration: "none",
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
                          src={BiggyHead}
                          width="150px"
                          height="150px"
                          textAlign="center"
                          justify="center"
                        />
                      )}
                      <Box display="flex" justifyContent="flex-end" m={2} p={1} >
                        <Box p={1}>
                          <Typography
                            fontSize={24}
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
                  
                  </Grid>
                  {/* <div
                    style={{
                      width: "100%",
                      height: "150px",
                      border: "none",
                      borderRadius: 3,
                      background: `url(${banner_bcm}) center/cover no-repeat`,
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
                          src={BiggyHead}
                          width="120px"
                          height="120px"
                          textAlign="center"
                          justify="center"
                        />
                      )}
                  </div> */}
                </a>
              </Grid>
            );
          })}
        </Grid>
        {error && <PopupQRReuse message={error} />}
      </Grid>

      {/* วิธีเล่น */}
      <HowtoPlay />
    </Grid>
  );
};

export default MainMission;
