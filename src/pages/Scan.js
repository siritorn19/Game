import React, { Component } from "react";
import QrReader from "modern-react-qr-reader";
import { Grid, Typography, Box, IconButton, Link } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import HowtoPlay from "../components/HowtoPlay";
import Layout from "./Layout";

class ScanQR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrData: null,
    };
  }

  handleScan = (data) => {
    if (data) {
      this.setState(
        {
          qrData: data,
        },
        () => {
          this.redirectBasedOnQRData(data);
        }
      );
    }
  };

  handleError = (err) => {
    console.error(err);
  };

  redirectBasedOnQRData = (data) => {
    const params = this.getParamsFromQRData(data);
    if (params || params.p || params.qr) {
      let redirectPage;
      // Check qr parameter to determine redirectPage
      if (
        params.qr === "B2iSLO" ||
        params.qr === "Yn75EO" ||
        params.qr === "13YZD3" ||
        params.qr === "IgsdWE" ||
        params.qr === "skvi69" ||
        params.qr === "aKvg6N" ||
        params.qr === "wMPC7B"
      ) {
        redirectPage = "missionhyp";
      } else if (params.qr === "5XRMgB") {
        redirectPage = "mainmission";
      }
      if (params.p === "hyp") {
        redirectPage = "missionhyp";
      } else if (params.p === "mini") {
        redirectPage = "missionbcm";
      }
      if (redirectPage) {
        window.location.href=`/${redirectPage}?qr=${params.qr}`;
      }
      //console.log(window.location.href);
    }
  };

  getParamsFromQRData = (data) => {
    try {
      const url = new URL(data);
      const searchParams = new URLSearchParams(url.search);
      const p = searchParams.get("p");
      const qr = searchParams.get("qr");
      return { p, qr };
    } catch (error) {
      console.error("Error parsing QR data:", error);
      return null;
    }
  };

  handleBack = (e) => {
    e.preventDefault();
    window.history.go(-1);
    return false;
    //navigate(-1);
    //window.location.href=`/${lang}/lobby`;
  };

  render() {
    return (
      <Layout>
        <Grid container spacing={0} direction="column">
          <Grid sx={{ m: 1 }}>
            <IconButton onClick={this.handleBack}>
              <ArrowBackIosIcon sx={{ stroke: "#ed1c24", strokeWidth: 2 }} />
            </IconButton>
          </Grid>
          <Grid item xs={12} sx={{ mb: 2, mt: 1 }}>
            <Typography fontSize={22} color="#ed1c24" align="center">
              <b>
                Biggy Hunt Challenge <br />
                นักช้อป มือโปร!! ตามล่าหาขุมสมบัติ
              </b>
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "10vh", backgroundColor: "#706e6e", m: 0, p: 0 }}
        >
          <QrReader
            delay={300}
            constraints={{
              facingMode: 'environment'
            }}
            //facingMode={"environment"}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: "100%", height: "100%" }}
          />
        </Grid>
      </Layout>
    );
  }
}

export default ScanQR;
