import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./index.css";
import { Grid } from "@mui/material";
import Home from "./pages/Home";
import MainMission from "./pages/MainMission";
import MissionHYP from "./pages/MissionHYP";
import MissionBCM from "./pages/MissionBCM";
import ScanQR from "./pages/Scan";
import LoginLineLiff from "./auth/LineLiff";

export default function App() {
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        // justifyContent="center"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Router>
          <LoginLineLiff />
          <Switch>
            <Route exact path="/" component={MainMission} />
            <Route path="/mainmission" component={MainMission} />
            <Route path="/missionhyp" component={MissionHYP} />
            <Route path="/missionbcm" component={MissionBCM} />
            <Route path="/mainmission" component={MainMission} />
            <Route path="/home" component={Home} />
            <Route path="/scanqr" component={ScanQR} />
            <Route path="*" render={() => <Redirect to="/" />} />
          </Switch>
        </Router>
      </Grid>
    </>
  );
}
