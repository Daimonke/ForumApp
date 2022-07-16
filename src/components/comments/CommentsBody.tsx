import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { context } from "../../context/Context";
import AnswerCard from "./CommentCard";
import CommentBar from "./CommentBar";
import PostSkeleton from "../posts/PostSkeleton";

export type CommentData = {
  comment: {
    id: number;
    post_id: number;
    user_id: number;
    comment: string;
    created_at: string;
    commentVotes: number;
    userVoted: number | null;
  };
  user: {
    id: number;
    username: string;
    avatar: string;
    userPostsCount: number;
  };
};

const CommentsBody = () => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const ctx = useContext(context);

  useEffect(() => {
    fetch(`content/comments/${id}`)
      .then((res) => res.json())
      .then((data) => setComments(data.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id, ctx.user]);

  return (
    <div className="flex flex-col gap-3">
      <CommentBar comments={comments} setComments={setComments} />
      {loading &&
        Array.from({ length: 5 }).map((_, i) => <PostSkeleton key={i} />)}
      {comments.map((comment) => (
        <AnswerCard
          key={comment.comment.id}
          data={comment}
          comments={comments}
          setComments={setComments}
        />
      ))}
    </div>
  );
};

export default CommentsBody;
