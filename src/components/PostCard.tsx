import { Divider } from "@mui/material";
import React from "react";
import { Post } from "../pages/Home";
import PostNav from "./PostNav";
import UserCard from "./UserCard";

type Props = {
  post: Post;
};

const PostCard = ({ post }: Props) => {
  return (
    <div className="flex gap-2 p-3 rounded-md bg-gradient-to-t from-gray-400/70 to-white/70 text-black">
      <UserCard />
      <div className="flex flex-col overflow-hidden">
        <h1 className="text-xl font-bold whitespace-nowrap text-ellipsis overflow-hidden">
          {post.title}
        </h1>
        <p className="line-clamp-2 mt-2">{post.content}</p>
        <Divider className="bg-blue-300 h-[2px]" />
        <PostNav />
      </div>
    </div>
  );
};

export default PostCard;
