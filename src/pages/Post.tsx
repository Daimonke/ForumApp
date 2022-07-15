import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentsBody from "../components/CommentsBody";
import SinglePostBody from "../components/SinglePostBody";
import { context, PostsData } from "../context/Context";

const Post = () => {
  const ctx = useContext(context);
  const [post, setPost] = useState<PostsData>();

  const { id } = useParams();
  useEffect(() => {
    setPost(ctx.posts.filter((post) => post.post.id === Number(id))[0]);
  }, [ctx.posts, id]);
  return (
    <div className="max-w-5xl m-auto flex flex-col p-3 md:p-5">
      {post && <SinglePostBody post={post} />}
      <CommentsBody />
    </div>
  );
};

export default Post;
