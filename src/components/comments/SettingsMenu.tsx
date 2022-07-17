import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import HealingRoundedIcon from "@mui/icons-material/HealingRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { IconButton } from "@mui/material";
import URL from "../../uri";
import { CommentData } from "./CommentsBody";
import { context } from "../../context/Context";
import { useParams } from "react-router-dom";

type Props = {
  setEditingMode: (mode: boolean) => void;
  comment_id: number;
  comments: CommentData[];
  setComments: (comments: CommentData[]) => void;
};

export default function SettingsMenu({
  setEditingMode,
  comment_id,
  comments,
  setComments,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const ctx = React.useContext(context);
  const post_id = useParams().id;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    setAnchorEl(null);
    const response = await fetch(`${URL}/content/comments/${comment_id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    if (data.success) {
      setComments(comments.filter((item) => item.comment.id !== comment_id));
      ctx.setPosts(
        ctx.posts.map((item) =>
          item.post.id === Number(post_id)
            ? {
                post: {
                  ...item.post,
                  comments: item.post.comments + -1,
                },
                user: { ...item.user },
              }
            : item
        )
      );
    }
  };

  return (
    <div>
      <IconButton sx={{ p: 0 }} onClick={handleClick}>
        <SettingsRoundedIcon className="text-green-600" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        classes={{
          paper: "!bg-black border-2 border-blue-300 !rounded-lg",
          list: "!py-0",
        }}
        sx={{
          outline: "none",
        }}
      >
        <MenuItem
          onClick={handleClose}
          className=" !text-green-600/90 !font-bold !flex gap-1 !px-2 hover:!bg-gray-900/60"
        >
          <HealingRoundedIcon className="text-green-500/90" />
          Edit
        </MenuItem>
        <MenuItem
          onClick={handleDelete}
          className=" !text-red-600/90 !font-bold !flex gap-1 !px-2 hover:!bg-gray-900/60"
        >
          <DeleteForeverRoundedIcon className="text-red-600/90" />
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}