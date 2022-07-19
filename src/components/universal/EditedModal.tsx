import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { CommentData } from "../comments/CommentsBody";
import UserCard from "../auth/UserCard";
import { PostsData } from "../../context/Context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "500px",
  width: { xs: "80%", sm: "60%", md: "40%", lg: "30%" },
  bgcolor: "black",
  border: "2px solid #7390E1",
  borderRadius: "8px",
  boxShadow: 24,
  p: 2,
};

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  comment?: CommentData;
  post?: PostsData;
};

export default function EditedModal({ open, setOpen, comment, post }: Props) {
  const handleClose = () => setOpen(false);

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
        <div className="flex gap-2">
          <IconButton
            sx={{
              position: "absolute",
              top: -10,
              right: -10,
              bgcolor: "black",
              p: 0,
              ":hover": {
                bgcolor: "rgb(20, 20, 20)",
              },
            }}
            onClick={handleClose}
          >
            <HighlightOffIcon className="text-red-500" fontSize="large" />
          </IconButton>
          <UserCard
            user={comment ? comment.user : post!.user}
            styles={"!justify-start"}
          />
          <div>
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              className="border-b-2"
            >
              {comment ? "Original Comment" : "Original Post"}
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ pt: 1 }}
            >
              {post?.post.original_title || post?.post.title}
            </Typography>

            <Typography
              id="modal-modal-description"
              variant="body1"
              sx={{ mt: 2, wordBreak: "break-word" }}
            >
              {comment
                ? comment.comment.original_comment
                  ? comment.comment.original_comment
                  : comment.comment.comment
                : null}
              {post
                ? post.post.original_content
                  ? post.post.original_content
                  : post.post.content
                : null}
            </Typography>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
