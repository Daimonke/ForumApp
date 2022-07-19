import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { context } from "../../context/Context";
import CommentCard from "./CommentCard";
import CommentBar from "./CommentBar";
import PostSkeleton from "../posts/PostSkeleton";
import URL from "../../uri";

export type CommentData = {
  comment: {
    id: number;
    post_id: number;
    user_id: number;
    comment: string;
    created_at: string;
    commentVotes: number;
    userVoted: number | null;
    original_comment: string | null;
  };
  user: {
    id: number;
    username: string;
    avatar: string;
    userPostsCount: number;
  };
};

type Props = {
  commentsCount: Number;
};

const CommentsBody = ({ commentsCount }: Props) => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const ctx = useContext(context);

  useEffect(() => {
    fetch(`${URL}/content/comments/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setComments(data.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id, ctx.user]);

  return (
    <div className="flex flex-col gap-3">
      <CommentBar comments={comments} setComments={setComments} />
      {loading &&
        Array.from({ length: Number(commentsCount) }).map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      {comments.map((comment) => (
        <CommentCard
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
