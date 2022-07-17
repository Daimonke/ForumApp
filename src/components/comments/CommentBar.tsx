import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { context } from "../../context/Context";
import URL from "../../uri";
import BasicModal from "../universal/BasicModal";
import { CommentData } from "./CommentsBody";

type Props = {
  comments: CommentData[];
  setComments: (comments: CommentData[]) => void;
};

const CommentBar = ({ comments, setComments }: Props) => {
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const ctx = useContext(context);
  const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!ctx.user) return setOpen(true);
    const response = await fetch(`${URL}/content/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        comment: comment,
        user_id: ctx.user.id,
        post_id: Number(id),
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.success === true) {
      setComments([
        ...comments,
        {
          comment: {
            id: data.inserted_id,
            post_id: Number(id),
            user_id: ctx.user.id,
            comment: comment,
            created_at: data.created_at,
            commentVotes: 0,
            userVoted: null,
          },
          user: {
            id: ctx.user.id,
            username: ctx.user.username,
            avatar: ctx.user.avatar,
            userPostsCount: ctx.user.userPostsCount,
          },
        },
      ]);
      setComment("");
    } else {
    }
  };

  return (
    <form
      onSubmit={handleComment}
      className="w-full flex bg-slate-600 rounded-md mt-3 p-3 gap-2"
    >
      <textarea
        className="p-2 min-h-[42px] w-full outline-none py-2 px-5 border-2 border-blue-300 rounded-md focus:border-blue-500 text-gray-100 bg-black/50 placeholder-gray-400"
        placeholder="Write a comment..."
        rows={1}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <input
        type="submit"
        className="cursor-pointer w-[30%] h-fit self-end p-2 rounded-md border-[1px] border-white bg-gradient-to-r from-blue-700/80 to-sky-800/80 text-gray-200 font-bold"
        value="POST"
      />
      <BasicModal open={open} setOpen={setOpen} />
    </form>
  );
};

export default CommentBar;
