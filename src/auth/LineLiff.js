import React, { useEffect, useState } from "react";
import liff from "@line/liff";
import queryString from "query-string";
import Navbar from "../components/NavBar";
import { AddSession } from "../helpper/function";
import CircularProgress from '@mui/material/CircularProgress';


const LoginLineLiff = () => {
  const [userName, setUserName] = useState("");
  const [userLineId, setUserLineId] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        await liff.init({
         liffId: "2002817424-Q5Mx7Nz3",
        // liffId: "1475405337-5oWAv137",
          withLoginOnExternalBrowser: true,
        });

        setLoading(false);

        // Parse the current URL
        const urlParams = new URLSearchParams(window.location.search);
        const qr = urlParams.get("qr");
        const m = urlParams.get("m");
        const p = urlParams.get("p");
        console.log(qr, m, p)

        if (p) {
          redirectToMission(p, qr);
          return; // Stop execution since redirecting
        }
        if (!liff.isLoggedIn()) {
          const redirectUri = constructRedirectUri();
          liff.login();
        } else {
          const profile = await liff.getProfile();
          console.log("User Profile:", profile);
          setUserName(profile.displayName);
          setUserLineId(profile.userId);
          setPictureUrl(profile.pictureUrl);
          AddSession(profile);
        }
      } catch (error) {
        console.error("Error initializing LIFF:", error.message);
      }
    };

    initializeLiff();
  }, []);

  const constructRedirectUri = () => {
    const currentUrl = window.location.href;
    return currentUrl;
  };

  const redirectToMission = (p, qr) => {
    let missionUrl;
    if (p === "hyp") {
      missionUrl = `/missionhyp/?qr=${qr}`;
    } else if (p === "mini") {
      missionUrl = `/missionbcm/?qr=${qr}`;
    }
    if (missionUrl) {
      window.location.href = missionUrl;
    }
  };


  if (loading) {
    return <div><CircularProgress /></div>;
  }

  return (
    <>
      <Navbar
        userName={userName}
        userLineId={userLineId}
        pictureUrl={pictureUrl}
      />
    </>
  );
};

export default LoginLineLiff;

// import React, { useEffect, useState } from "react";
// import liff from "@line/liff";
// import queryString from "query-string";
// import Navbar from "../components/NavBar";
// import { AddSession } from "../helpper/function";

// const LoginLineLiff = () => {
//   const [userName, setUserName] = useState("");
//   const [userLineId, setUserLineId] = useState("");
//   const [pictureUrl, setPictureUrl] = useState("");

//   useEffect(() => {
//     const initializeLiff = async () => {
//         try {
//           await liff.init({
//             liffId: "2002817424-Q5Mx7Nz3",
//             // liffId: "1475405337-5oWAv137",
//             withLoginOnExternalBrowser: true,
//           });
//           const params = queryString.parse(window.location.search);
//           if (params.qr) {
//             console.log("QR from URL:", params.qr);
//           }
//           if (params.m) {
//             console.log("M from URL:", params.m);
//           }
//           if (params.p) {
//             console.log("P from URL:", params.p);
//             redirectToMission(params.p, params.qr);
//           }

//           if (!liff.isLoggedIn()) {
//             const destinationUrl = constructRedirectUri();
//             liff.login({ redirectUri: destinationUrl });
//             liff.getIDToken();
//           } else {
//             const profile = await liff.getProfile();
//             console.log("User Profile:", profile);
//             setUserName(profile.displayName);
//             setUserLineId(profile.userId);
//             setPictureUrl(profile.pictureUrl);
//             AddSession(profile);
//           }
//         } catch (error) {
//           console.error("Error initializing LIFF:", error.message);
//         }
//       };

//     initializeLiff();
//   }, []);

//   const constructRedirectUri = () => {
//     const currentUrl = window.location.href;
//     const params = queryString.parse(window.location.search);
//     const redirectParams = Object.keys(params)
//       .map((key) => `${key}=${encodeURIComponent(params[key])}`)
//       .join("&");
//     return `${currentUrl.split("?")[0]}?${redirectParams}`;
//   };

//   const redirectToMission = (p, qr) => {
//     let missionUrl;
//     if (p === "hyp") {
//       missionUrl = `/missionhyp/?qr=${qr}`;
//     } else if (p === "mini") {
//       missionUrl = `/missionbcm/?qr=${qr}`;
//     }
//     if (missionUrl) {
//       window.location.href = missionUrl;
//     }
// }

//   return (
//     <>
//       <Navbar
//         userName={userName}
//         userLineId={userLineId}
//         pictureUrl={pictureUrl}
//       />
//     </>
//   );
// };

// export default LoginLineLiff;
