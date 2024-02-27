import React, { Component } from "react";
import QrReader from "modern-react-qr-reader";
import { Grid } from "@mui/material";

class ScanQR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrData: null,
    };
  }

  handleScan = (data) => {
    if (data) {
      this.setState({
        qrData: data,
      }, () => {
        this.redirectBasedOnQRData(data);
      });
    }
  };

  handleError = (err) => {
    console.error(err);
  };

  redirectBasedOnQRData = (data) => {
    const params = this.getParamsFromQRData(data);
    if (params && params.p) {
      let redirectPage;
      if (params.p === 'hyp') {
        redirectPage = 'missionhyp';
      } else if (params.p === 'mini') {
        redirectPage = 'missionbcm';
      }
      if (redirectPage) {
        window.location.href = `/${redirectPage}?qr=${params.qr}`;
      }
    }
  };

  getParamsFromQRData = (data) => {
    // Assuming the QR code data is in URL format
    try {
      const url = new URL(data);
      const searchParams = new URLSearchParams(url.search);
      const p = searchParams.get('p');
      const qr = searchParams.get('qr');
      return { p, qr };
    } catch (error) {
      console.error("Error parsing QR data:", error);
      return null;
    }
  };

  render() {
    return (
      <>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh", backgroundColor: "#706e6e", m: 0, p: 0 }}
        >
          <QrReader
            delay={300}
            facingMode={"environment"}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: "100%", height: "100%" }}
          />
        </Grid>
      </>
    );
  }
}

export default ScanQR;