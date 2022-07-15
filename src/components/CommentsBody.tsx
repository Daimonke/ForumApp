import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnswerCard from "./AnswerCard";
import CommentBar from "./CommentBar";

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
  const { id } = useParams();

  useEffect(() => {
    fetch(`content/comments/${id}`)
      .then((res) => res.json())
      .then((data) => setComments(data.data));
  }, [id]);

  return (
    <div className="">
      <CommentBar />
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
