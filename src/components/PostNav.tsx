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
  const { userVoted, postVotes, id } = post;

  const ctx = useContext(context);
  const [votes, setVotes] = useState(postVotes);
  const [open, setOpen] = useState(false);
  const [jump, setJump] = useState(false);

  const deleteVote = () => {
    fetch(`content/vote/${id}`, {
      method: "DELETE",
    });
  };

  const setUserVote = async (vote: number | null) => {
    ctx.setPosts(
      ctx.posts.map((item) =>
        item.post.id === id
          ? {
              post: { ...item.post, userVoted: vote },
              user: { ...item.user },
            }
          : item
      )
    );
  };

  const handleVote = async (vote: number) => {
    let inc = 1;
    if (!ctx.user) return setOpen(true);
    if (userVoted === vote) {
      deleteVote();
      setVotes(vote === 0 ? votes + 1 : votes - 1);
      return setUserVote(null);
    }
    if (userVoted !== null) {
      deleteVote();
      inc = 2;
    }
    const data = await fetch("content/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: id,
        user_id: ctx.user.id,
        vote: vote,
      }),
    });
    const json = await data.json();
    if (json.success) {
      vote === 1 ? setVotes(votes + inc) : setVotes(votes - inc);
      setJump(true);
      setUserVote(vote);
    } else {
      console.log(json.message);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 mt-2">
        <IconButton sx={{ p: 0 }} onClick={() => handleVote(1)}>
          <ThumbUpIcon
            className={userVoted === 1 ? "text-blue-700" : ""}
            fontSize="medium"
          />
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
          <ThumbDownIcon
            className={userVoted === 0 ? "text-red-700" : ""}
            fontSize="medium"
          />
        </IconButton>
        <BasicModal open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default PostNav;
