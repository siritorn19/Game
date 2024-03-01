import React from "react";
import "./Loading.css";
import * as loadingData from "./LoadingBigC.json";
import Lottie from "lottie-react";

export default function Loading() {
  return (
    <div className="loading">
      <div className="img">
        <Lottie animationData={loadingData} loop={true} />
      </div>
    </div>
  );
}