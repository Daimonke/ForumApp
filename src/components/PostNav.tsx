import React from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { IconButton } from "@mui/material";

type Props = {};

const PostNav = (props: Props) => {
  return (
    <div className="flex items-end">
      <IconButton sx={{ p: 0, mt: 0.5 }}>
        <ArrowCircleUpIcon className="text-green-500" fontSize="large" />
      </IconButton>
      <IconButton sx={{ p: 0, mt: 0.5 }}>
        <ArrowCircleDownIcon className="text-red-500" fontSize="large" />
      </IconButton>
    </div>
  );
};

export default PostNav;
