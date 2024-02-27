import * as React from "react";
import { styled, css } from "@mui/system";
import { Button } from "@mui/base/Button";
import { Dialog, DialogTitle, DialogActions } from "@mui/material";

const PopupQRReuse = ({ message }) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        align="center"
        open={open}
        onClose={handleClose}
        sx={{ p: 2, borderRadius: 10, justifyContent: "center" }}
      >
        <DialogTitle sx={{ textAlign: "center", fontSize: "22px", p: 3 }}>
          <b>{message}</b>
        </DialogTitle>
        <DialogActions>
          <ModalButton onClick={handleClose} sx={{ p: 2 }}>
            CLOSE
          </ModalButton>
        </DialogActions>
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
