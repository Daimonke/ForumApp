import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link, useLocation } from "react-router-dom";
import { IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "black",
  border: "2px solid #7390E1",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function BasicModal({ open, setOpen }: Props) {
  const handleClose = () => setOpen(false);
  const location = useLocation().pathname;

  return (
    <Modal
      id="modal"
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        outline: "none",
      }}
    >
      <Box sx={style}>
        <IconButton
          sx={{ position: "absolute", top: 1, right: 2 }}
          onClick={handleClose}
        >
          <HighlightOffIcon className="text-red-500" fontSize="large" />
        </IconButton>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Please{" "}
          <Link to="/login" state={location} className="text-blue-500">
            LOGIN
          </Link>{" "}
          to do that!
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Or{" "}
          <Link to="/register" state={location} className="text-green-500">
            SIGNUP
          </Link>{" "}
          to join this awesome community!
        </Typography>
      </Box>
    </Modal>
  );
}
