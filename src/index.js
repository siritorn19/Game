import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);



// import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter, Route } from "react-router-dom";
// import "./index.css";
// import { Grid } from "@mui/material";
// import Navbar from "./components/NavBar";
// import Home from "./pages/Home";
// import App from "./App";
// import Mission from "./pages/Mission";
// import MainMission from "./pages/MainMission";
// import MissionHYP from "./pages/MissionHYP";
// import LineLogin from "./auth/LineLogin";

// // import CustomImageList from "./components/CustomImageList";
// // import QRScan from "./qr-reader/qr-reader.component";
// // import addLineUser from './pages/Liff'
// // import { LiffProvider } from 'react-liff';


//   ReactDOM.render(
//     <React.StrictMode>
//       <Navbar path="/:param1/:param2" />
//       <Grid
//         container
//         spacing={0}
//         direction="column"
//         alignItems="center"
//         // justifyContent="center"
//         sx={{ display: "flex", justifyContent: "space-between" }}
//       >
//         <BrowserRouter>
//           <Route exact path="/" component={Home}  />
//           <Route path="/MainMission" component={MainMission} />
//           <Route path="/MissionHYP" component={MissionHYP} />
//           <Route path="/App" component={App} />
//           <Route path="/Mission" component={Mission} />
//           <Route path="/LineLogin" component={LineLogin} />
//           {/* <Route path="/QRScan" component={QRScan} /> */}
//         </BrowserRouter>
//       </Grid>
//     </React.StrictMode>,

//     document.getElementById("root")
//   );
