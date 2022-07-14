import { Divider } from "@mui/material";
import React from "react";
import { PostsData } from "../context/Context";
import PostNav from "./PostNav";
import UserCard from "./UserCard";

type Props = {
  item: PostsData;
};

const PostCard = ({ item }: Props) => {
  const { title, content, created_at, user_id } = item.post;
  return (
    <div className="flex gap-4 p-3 rounded-md bg-gradient-to-t from-gray-400/70 to-white/70 text-black">
      <UserCard user={item.user} />
      <div className="flex flex-col overflow-hidden w-full justify-between">
        <div className="flex justify-between items-start gap-2">
          <h1 className="text-xl font-bold text-ellipsis overflow-hidden line-clamp-2">
            {title}
          </h1>
          <p className="text-xs md:text-sm w-fit whitespace-nowrap pt-1">
            {created_at.split(" ")[0]}
          </p>
        </div>
        <div className="h-full">
          <p className="line-clamp-2 mt-2">{content}</p>
        </div>
        <Divider className="bg-blue-300 h-[2px]" />
        <PostNav post={item.post} />
      </div>
    </div>
  );
};

export default PostCard;
