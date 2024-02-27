import * as React from "react";
import { useState } from "react";
//import { CheckCircleFilled } from "@ant-design/icons";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import FloatingActionButtons from "../components/FloatingActionButtons";
import {
  Grid,
  Box,
  Card,
  CardHeader,
  Typography,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const testData = [
  "Mission 1",
  "Mission 2",
  "Mission 3",
  "Mission 4",
  "Mission 5",
  "Mission 6",
];

const Mission = () => {
  const [open, setOpen] = useState(false);
  // const [mission, setMission] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const useStyles = makeStyles({
    paper: {
      maxWidth: 330,
    },
    icon: {
      float: "right",
    },
  });

  {
    /* Line Liff */
  }

  

  return (
    <div style={{ width: "100%" }}>
      <Box>
        <Typography variant="h4" sx={{ textAlign:"center", p:2, fontWeight: 700 }}> Big C </Typography>
      </Box>

      {/* Item */}
      <Grid item xs={12} textAlign="center">
        {testData.map((Mission, index) => (
          <Card
            key={index}
            variant="outlined"
            className="course card"
            sx={{ display: "flex", p: 2.5 }}
          >
            {/*<CheckCircleFilled style={{ fontSize: "50px", color: "grey" }} />*/}
            <CardHeader
              sx={{
                display: "flex",
                flex: "1",
              }}
              title={
                <Typography
                  className="title"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {Mission}
                </Typography>
              }
            ></CardHeader>

            {/* Alert Dialog */}
            <Button
              sx={{ m: 0.5 }}
              variant="outlined"
              color="success"
              onClick={handleClickOpen}
            >
              Award
            </Button>

            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
              sx={{ m: 1 }}
            >
              <DialogTitle>
                <Typography fontSize={20}>
                  {" "}
                  {" ยินดีด้วย! คุณได้ผ่าน Mission ที่ 1 แล้ว"}{" "}
                </Typography>
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  รางวัล 1 GEMS
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  onClick={handleClose}
                >
                  <Typography fontSize={20}> รับรางวัล </Typography>
                </Button>
              </DialogActions>
              <DialogActions>
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  onClick={handleClose}
                >
                  <Typography fontSize={20}> ส่งรางวัลให้เพื่อน </Typography>
                </Button>
              </DialogActions>
            </Dialog>
          </Card>
        ))}
      </Grid>

      {/* btn camera */}
      <Grid>
        <FloatingActionButtons />
      </Grid>
    </div>
  );
};

export default Mission;
