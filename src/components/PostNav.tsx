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

  const patchVote = (vote: number | null) => {
    fetch(`content/vote/${id}?vote=${vote}`, {
      method: "PATCH",
    });
  };

  const setUserVote = async (vote: number | null | false) => {
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
      patchVote(2);
      setVotes(vote === 0 ? votes + 1 : votes - 1);
      return setUserVote(2);
    }
    if (userVoted === 2) {
      patchVote(vote);
      setVotes(vote === 0 ? votes - 1 : votes + 1);
      return setUserVote(vote);
    }

    if (userVoted !== null && userVoted !== 2) {
      patchVote(userVoted === 0 ? 1 : 0);
      inc = 2;
      vote === 1 ? setVotes(votes + inc) : setVotes(votes - inc);
      return setUserVote(vote);
    }
    const prevUserVote = userVoted;
    vote === 1 ? setVotes(votes + inc) : setVotes(votes - inc);
    setUserVote(vote);
    setJump(true);

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
    if (json.success === false) {
      setUserVote(prevUserVote);
      vote === 1 ? setVotes(votes - inc) : setVotes(votes + inc);
      console.log(json.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-10 mt-2">
        <div className="flex items-center justify-start gap-2 w-full">
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
        </div>
        <div className="w-full gap-3 flex items-center">
          <Link
            to={`/post/${id}`}
            className=" text-center bg-blue-400 text-gray-800 font-bold p-2  rounded-md hover:bg-blue-500 transition-all w-full"
          >
            <button>{"Read more"}</button>
          </Link>
        </div>
        <BasicModal open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default PostNav;
