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
import CircularProgress from "@mui/material/CircularProgress";


const Navbar = ({ userName, pictureUrl }) => {
  const [userData, setUserData] = useState(null);
  const [rewardData, setRewardData] = useState(null);
  const [error, setError] = useState(null);
  // const [lineId, setUserLineId] = useState(userLineId);
  const userLineId = sessionStorage.getItem("userId");

  const fetchUserData = async () => {
    try {
      // console.log(`userLineId-: ${userLineId}`);
      const response = await axios.get(
        `https://line-game-treasure-hunt-api-stg-aedsyeswba-as.a.run.app/user/checkuser/${userLineId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response.data);
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


 
  useEffect(() => {
    if (userLineId !== "") {
      fetchUserData();
    } 
  }, []);



  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return (
      <div><CircularProgress /></div>
    );
  }

  return (
    <>
      <AppBar position="static" sx={{ background: "#ed1c24" }}>
      <PopupAward error={error} rewardData={rewardData} />
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
              <p>mini_reward: {userData.mini_reward.toString()}</p>
            </div>
          )}  */}

      {/*   {rewardData && (
            <div>
              <p>Status: {rewardData.status}</p>
              <p>Message: {rewardData.message}</p>
            </div>
          )}
          {error && <div>Error: {error}</div>}
          {!userData && !rewardData && !error && <div>Loading...</div>} 
        </div> */}

          <Toolbar sx={{ m: 0, p: 0.2 }}>
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
                        fontWeight="600"
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
          </Toolbar>
        </Grid>
      </AppBar>
    </>
  );
};

export default Navbar;
