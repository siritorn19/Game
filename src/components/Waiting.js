import React from "react";
import "./Waiting.css";
import * as loadingData from "./LoadingBigC.json";
import Lottie from "lottie-react";

export default function Waiting() {
  return (
    <div className="loading-waiting">
      <div className="img-waiting">
        <Lottie animationData={loadingData} loop={true} />
      </div>
    </div>
  );
}