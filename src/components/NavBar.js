import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Stack,
  AppBar,
  Box,
  Toolbar,
  Card,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PopupAward from "./AleartAward";
// import Gem from "../imges/gem.png";
import CircularProgress from '@mui/material/CircularProgress';


const Navbar = ({ userName, pictureUrl }) => {
  const [userData, setUserData] = useState(null);
  const [rewardData, setRewardData] = useState(null);
  const [error, setError] = useState(null);
  // const [lineId, setUserLineId] = useState(userLineId);
  const userLineId = sessionStorage.getItem("userId");

  const fetchUserData = async () => {
    try {
      console.log(`userLineId-: ${userLineId}`);
      const response = await axios.get(
        `https://line-game-treasure-hunt-api-stg-aedsyeswba-as.a.run.app/user/checkuser/${userLineId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        const data = response.data;
        if (data.status === "success") {
          setUserData(data.data);
        } else {
          setError(data.message);
        }
      } else {
        setError("Failed to fetch data from the API");
      }
    } catch (error) {
      setError("An error occurred while fetching data");
    }
  };



  const fetchReward = async () => {
    try {
      // console.log(`Get reward-: ${userLineId}`);
      await fetchUserData().then(() => {
        if (!userData) {
          console.log("bigpointId is null"); // Log the status when bigpointId is null
          // setError("Failed to get reward: bigpointId is null");
          return; 
        }
        const bigpointId = userData.bigpoint_id === null ? "null" : userData.bigpoint_id;
        const requestData = {
          userId: userLineId,
          rewardType: 1,
          bigpointId: bigpointId,
        };
        console.log("Data sent to API:", requestData); // Log the data sent to the API
  
        axios.post(
          `https://line-game-treasure-hunt-api-stg-aedsyeswba-as.a.run.app/reward/getreward/`,
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(GetRewardResponse => {
          console.log("Response data:", GetRewardResponse.data);
          if (GetRewardResponse.data.status === "success") {
            setRewardData(GetRewardResponse.data);
            window.alert("Get Reward"); // Display alert for success
          } else {
            // setError(GetRewardResponse.data.message);
          }
        })
        .catch(error => {
          console.error("Error fetching data:", error);
          // setError("Failed to get reward");
        });
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      // setError("Failed to get reward");
    }
  };


  useEffect(() => {
    if (userLineId !== "") {
      fetchUserData();
    }
  }, [userLineId]);

  useEffect(() => {
    if (userData) {
      fetchReward(userLineId);
    }
  }, []);



  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div><CircularProgress /></div>;
  }

  return (
    <>
      <AppBar position="static" sx={{ background: "#ed1c24" }}>
        <PopupAward error={error} />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          sx={{ display: "flex" }}
        >
          {/* <div>
          {userData && (
            <div>
              <p>User ID: {userData.id}</p>
              <p>Bigpoint ID: {userData.bigpoint_id}</p>
              <p>Line mid: {userData.line_mid}</p>
              <p>Store Reward: {userData.store_reward.toString()}</p>
            </div>
          )} 

        {rewardData && (
            <div>
              <p>Status: {rewardData.status}</p>
              <p>Message: {rewardData.message}</p>
            </div>
          )}
          {error && <div>Error: {error}</div>}
          {!userData && !rewardData && !error && <div>Loading...</div>}
        </div> */}


          <Toolbar sx={{ m: 0 }}>
            <div style={{ width: "100%" }}>
              <Card
                sx={{
                  maxWidth: 300,
                  background: "#ed1c24",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                <Box sx={{ pt: 1, pb: 1 }}>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <>
                      <Avatar
                        alt="User Profile"
                        src={pictureUrl}
                        width="85px"
                      />
                      <Typography
                        fontSize="15px"
                        color="#fff"
                        sx={{ p: 0.2, ml: 0.5 }}
                      >
                        {userName}
                        <br />
                        {userData.bigpoint_id}
                        {/* {userLineId} */}
                      </Typography>
                    </>
                  </Stack>
                </Box>
              </Card>
            </div>

            {/* <Card
            sx={{
              maxWidth: 300,
              background: "#ed1c24",
              boxShadow: "none",
              border: 1,
              borderRadius: 5,
              borderColor: "#ffdc05",
              pr: 5,
            }}
          >
             <Box sx={{ p: 0.3 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                borderRadius={1}
              >
                show Gem
                <Box
                  component="img"
                  alt="BigC"
                  // src={Gem}
                  width="25px"
                  textAlign="center"
                  sx={{ pr: 1 }}
                />
                show name
                <Typography variant="h8" color="common.white" sx={{ p: 0.2 }}>
                  Point
                </Typography>
              </Stack>
            </Box>
          </Card> */}
          </Toolbar>
        </Grid>
      </AppBar>
    </>
  );
};

export default Navbar;
