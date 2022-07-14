import React, { useContext, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { IconButton } from "@mui/material";
import { context, PostsPost } from "../context/Context";
import { Link } from "react-router-dom";
import BasicModal from "./BasicModal";

type Props = {
  post: PostsPost;
};

const PostNav = ({ post }: Props) => {
  const ctx = useContext(context);
  const [votes, setVotes] = useState(post.postVotes);
  const [open, setOpen] = useState(false);
  const [jump, setJump] = useState(false);

  const handleVote = async (vote: number) => {
    if (!ctx.user) return setOpen(true);
    const data = await fetch("content/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: post.id,
        user_id: ctx.user.id,
        vote: vote,
      }),
    });
    const json = await data.json();
    if (json.success) {
      vote === 1 ? setVotes(votes + 1) : setVotes(votes - 1);
      setJump(true);
    } else {
      console.log(json.message);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 mt-2">
        <IconButton sx={{ p: 0 }} onClick={() => handleVote(1)}>
          <ThumbUpIcon className="text-blue-700" fontSize="medium" />
        </IconButton>
        <span
          className={`text-xl ${
            votes > 0
              ? "text-blue-900"
              : votes < 0
              ? "text-red-900"
              : "text-gray-800"
          } ${jump ? "jump" : ""}`}
          onAnimationEnd={() => setJump(false)}
        >
          {votes}
        </span>
        <IconButton sx={{ p: 0 }} onClick={() => handleVote(0)}>
          <ThumbDownIcon className="text-red-700" fontSize="medium" />
        </IconButton>
        <BasicModal open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default PostNav;
