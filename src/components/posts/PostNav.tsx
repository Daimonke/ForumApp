import React, { useContext, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import { context, PostsPost } from "../../context/Context";
import BasicModal from "../universal/BasicModal";
import URL from "../../uri";

type Props = {
  post: PostsPost;
  disableCommentBtn?: boolean;
};

const PostNav = ({ post, disableCommentBtn }: Props) => {
  const { userVoted, postVotes, id, comments } = post;

  const ctx = useContext(context);
  const [votes, setVotes] = useState(postVotes);
  const [open, setOpen] = useState(false);
  const [jump, setJump] = useState(false);

  const patchVote = (vote: number | null) => {
    fetch(`${URL}/content/vote/${id}?vote=${vote}`, {
      method: "PATCH",
      credentials: "include",
    });
  };

  const setUserVote = async (vote: number | null, incVotes: number) => {
    ctx.setPosts(
      ctx.posts.map((item) =>
        item.post.id === id
          ? {
              post: {
                ...item.post,
                userVoted: vote,
                postVotes: incVotes,
              },
              user: { ...item.user },
            }
          : item
      )
    );
  };

  const handleVote = async (vote: number) => {
    setJump(false);
    let inc = 1;
    if (!ctx.user) return setOpen(true);
    setJump(true);
    if (userVoted === vote) {
      patchVote(2);
      const newVotes = vote === 0 ? votes + 1 : votes - 1;
      setVotes(newVotes);
      return setUserVote(2, newVotes);
    }
    if (userVoted === 2) {
      patchVote(vote);
      const newVotes = vote === 0 ? votes - 1 : votes + 1;
      setVotes(newVotes);
      return setUserVote(vote, newVotes);
    }

    if (userVoted !== null && userVoted !== 2) {
      patchVote(userVoted === 0 ? 1 : 0);
      inc = 2;
      const newVotes = vote === 1 ? votes + inc : votes - inc;
      setVotes(newVotes);
      return setUserVote(vote, newVotes);
    }
    const prevUserVote = userVoted;
    const newVotes = vote === 1 ? votes + inc : votes - inc;
    setVotes(newVotes);
    setUserVote(vote, newVotes);

    const data = await fetch(`${URL}/content/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        post_id: id,
        user_id: ctx.user.id,
        vote: vote,
      }),
    });
    const json = await data.json();
    if (json.success === false) {
      const newVotes = vote === 1 ? votes - inc : votes + inc;
      setVotes(newVotes);
      setUserVote(prevUserVote, newVotes);
      console.log(json.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-5 mt-2">
        <div className="flex items-center justify-start gap-2">
          <IconButton sx={{ p: 1 }} onClick={() => handleVote(1)}>
            <ThumbUpIcon
              className={userVoted === 1 ? "text-blue-700" : ""}
              fontSize="medium"
            />
          </IconButton>
          <p
            className={`text-xl min-w-[1.25rem] flex justify-center  ${
              votes > 0
                ? "text-blue-900"
                : votes < 0
                ? "text-red-900"
                : "text-gray-800"
            } ${jump ? "jump" : ""}`}
            onAnimationEnd={() => setJump(false)}
          >
            {votes}
          </p>
          <IconButton sx={{ p: 1 }} onClick={() => handleVote(0)}>
            <ThumbDownIcon
              className={userVoted === 0 ? "text-red-700" : ""}
              fontSize="medium"
            />
          </IconButton>
        </div>
        <div className="w-full gap-3 flex items-center justify-end">
          {!disableCommentBtn && (
            <Link
              to={`/post/${id}`}
              className="max-w-[400px] text-xs md:text-lg text-center bg-blue-200 text-gray-800 font-bold p-2  rounded-md hover:bg-blue-500 transition-all w-full"
            >
              <button>
                <QuestionAnswerRoundedIcon sx={{ mr: 0.5 }} />
                {comments === 1
                  ? comments + " Comment"
                  : comments + " Comments"}
              </button>
            </Link>
          )}
        </div>
        <BasicModal open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default PostNav;
