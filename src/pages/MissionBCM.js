import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography, Box, IconButton, Link } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import HowtoPlay from "../components/HowtoPlay";
import PopupQRReuse from "../components/AlertqrReuse";
import Hunt01 from "../imges/hyp/Biggy-Treasure-Hunt-01.jpg";
import BiggyHead from "../imges/BiggyHead.png";

const MissionBCM = () => {
  const [missionData, setMissionData] = useState([]);
  const [status, setStatus] = useState("");
  const [processData, setProcessData] = useState([]);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [rewardData, setRewardData] = useState(null);
  const [rewardFetched, setRewardFetched] = useState(false);
  const userId = sessionStorage.getItem("userId");
  const history = useHistory();

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
              setError(response.data.message);
              setTimeout(() => {
                console.log("response message:", response.data.message); // Log error message
                setError(response.data.message); // Update error state
              }, 3000);
              //   setTimeout(() => {
              //     setError(response.data.message);
              //   }, 3000);
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

  //   useEffect(() => {
  //     if (setMissionData) {
  //       fetchReward();
  //     }
  //   }, [userId]);

  const navigateToMainMission = () => {
    history.push("/mainmission");
  };

  return (
    <div>
      <Grid sx={{ m: 1 }}>
        <IconButton onClick={navigateToMainMission}>
          <ArrowBackIosIcon sx={{ stroke: "#ed1c24", strokeWidth: 2 }} />
        </IconButton>
        <Grid item xs={12} sx={{ mb: 2, mt: 1 }}>
          <Typography fontSize={22} color="#ed1c24" align="center">
            <b>
              Biggy Hunt Challenge <br />
              นักช้อป มือโปร!! ตามล่าหาขุมสมบัติ
            </b>
          </Typography>
        </Grid>
        <Grid container>
          {[1].map((stageNumber) => {
            const mission = missionData.find(
              (mission) => mission.check_point_name === "stage Big C mini"
            );

            return (
              <Grid item xs={12} key={stageNumber}>
                <a href="/scanqr">
                  <div
                    style={{
                      width: "100%",
                      height: stageNumber === 1 ? "120px" : "120px",
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
                          src={BiggyHead}
                          width="120px"
                          height="120px"
                          textAlign="center"
                          justify="center"
                        />
                      )}
                  </div>
                </a>
              </Grid>
            );
          })}
        </Grid>
        {error && <PopupQRReuse message={error} />}
      </Grid>
      <Grid sx={{ m: 2 }}>
        <HowtoPlay />
      </Grid>
    </div>
  );
};

export default MissionBCM;
