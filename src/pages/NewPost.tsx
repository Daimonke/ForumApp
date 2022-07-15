import React from "react";
import PostForm from "../components/PostForm";

type Props = {};

const NewPost = (props: Props) => {
  return (
    <div className="my-[7vh] py-2 px-5 sm:px-20">
      <PostForm />
    </div>
  );
};

export default NewPost;
