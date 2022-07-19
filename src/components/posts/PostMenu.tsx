import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import HealingRoundedIcon from "@mui/icons-material/HealingRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { IconButton } from "@mui/material";
import URL from "../../uri";
import { context } from "../../context/Context";
import { useNavigate, useParams } from "react-router-dom";

type Props = {
  setEditingMode: (mode: boolean) => void;
};

export default function PostMenu({ setEditingMode }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const ctx = React.useContext(context);
  const post_id = useParams().id;
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setEditingMode(true);
    handleClose();
  };

  const handleDelete = async () => {
    setAnchorEl(null);
    const oldPosts = ctx.posts;
    ctx.setPosts(ctx.posts.filter((post) => post.post.id !== Number(post_id)));
    navigate("/");
    const response = await fetch(`${URL}/content/posts/${post_id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    if (data.success === false) {
      ctx.setPosts(oldPosts);
      navigate(`/post/${post_id}`);
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
          onClick={handleEdit}
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
