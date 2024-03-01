import * as React from "react";
import { styled, css } from "@mui/system";
import { Button } from "@mui/base/Button";
import { Dialog, DialogContent, Grid, CardMedia, Box } from "@mui/material";
import BiggyHead from "../imges/BiggyHead.png";
import "./Alert.css";

const PopupQRReuse = ({ message, page}) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    if(page === 'Main'){
      window.location.href="/mainmission";
    }
    else if(page === 'HYP'){
      window.location.href="/missionhyp";
    }
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        className="alert-dialog"
        align="center"
        open={open}
        onClose={handleClose}
        sx={{
          p: 2,
          borderRadius: 25,
          justifyContent: "center",
          borderColor: "#555",
        }}
      >
        <DialogContent className="box-dialog">
          <Grid container spacing={1}>
            <Grid item sm={12} xs={12}>
              <CardMedia
                className="box-dialog-img"
                component="img"
                image={BiggyHead}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <b>{message}</b>
            </Grid>
            <Grid item sm={12} xs={12}>
              <Box className="btn-dialog">
                <Button sx={{ color: "#fff" }} onClick={handleClose}>
                  CLOSE
                </Button>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const ModalButton = styled(Button)(
  ({ theme }) => `
  fontFamily: 'Prompt'
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5;
  background-color: #ed1c24;
  padding: 7px 30px;
  border-radius: 25px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid #ed1c24;
  box-shadow: 0 2px 1px ${
    theme.palette.mode === "dark"
      ? "rgba(0, 0, 0, 0.5)"
      : "rgba(45, 45, 60, 0.2)"
  }, inset 0 1.5px 1px #ed1c24, inset 0 -2px 1px #ed1c24;

  &:hover {
    background-color: #ed1c24;
  }

  &:active {
    background-color: #ed1c24;
    box-shadow: none;
  }
  }
`
);

export default PopupQRReuse;
