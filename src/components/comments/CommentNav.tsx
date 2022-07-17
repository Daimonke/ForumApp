import React, { useContext, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { IconButton } from "@mui/material";
import { context } from "../../context/Context";
import BasicModal from "../universal/BasicModal";
import { CommentData } from "./CommentsBody";
import URL from "../../uri";
import SettingsMenu from "./SettingsMenu";

type Props = {
  comment: CommentData["comment"];
  comments: CommentData[];
  setComments: (comments: CommentData[]) => void;
  setEditingMode: (mode: boolean) => void;
};

const CommentNav = ({
  comment,
  comments,
  setComments,
  setEditingMode,
}: Props) => {
  const { userVoted, commentVotes, id, created_at, user_id } = comment;

  const ctx = useContext(context);
  const [votes, setVotes] = useState(commentVotes);
  const [open, setOpen] = useState(false);
  const [jump, setJump] = useState(false);

  const patchVote = (vote: number | null) => {
    fetch(`${URL}/content/commentsVote/${id}?vote=${vote}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  const setUserVote = async (vote: number | null, incVotes: number) => {
    setComments(
      comments.map((item) =>
        item.comment.id === id
          ? {
              comment: {
                ...item.comment,
                userVoted: vote,
                commentVotes: incVotes,
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

    const data = await fetch(`${URL}/content/commentsVote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        comment_id: id,
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
          <IconButton sx={{ p: 0 }} onClick={() => handleVote(1)}>
            <ThumbUpIcon
              className={userVoted === 1 ? "text-blue-700" : "text-gray-400"}
              fontSize="medium"
            />
          </IconButton>
          <p
            className={`text-xl min-w-[1.25rem] flex justify-center  ${
              votes > 0
                ? "text-blue-500"
                : votes < 0
                ? "text-red-900"
                : "text-gray-200"
            } ${jump ? "jump" : ""}`}
            onAnimationEnd={() => setJump(false)}
          >
            {votes}
          </p>
          <IconButton sx={{ p: 0 }} onClick={() => handleVote(0)}>
            <ThumbDownIcon
              className={userVoted === 0 ? "text-red-700" : "text-gray-400"}
              fontSize="medium"
            />
          </IconButton>
        </div>
        <div className="w-full gap-3 flex items-center justify-end">
          {ctx.user && ctx.user.id === user_id && (
            <SettingsMenu
              setEditingMode={setEditingMode}
              comment_id={id}
              comments={comments}
              setComments={setComments}
            />
          )}
          <p className="text-xs md:text-sm w-fit whitespace-nowrap pt-1">
            {created_at.split(" ")[0]}
          </p>
        </div>
        <BasicModal open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default CommentNav;
