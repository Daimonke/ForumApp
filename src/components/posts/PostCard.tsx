import { Divider } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PostsData } from "../../context/Context";
import UserCard from "../auth/UserCard";
import PostNav from "./PostNav";

type Props = {
  item: PostsData;
};

const PostCard = ({ item }: Props) => {
  const { title, content, created_at, id } = item.post;
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;
    const tag = target.tagName.toLowerCase();
    if (
      (tag === "div" && target.parentElement?.id !== "modal") ||
      tag === "p" ||
      tag === "h1"
    )
      navigate(`/post/${id}`);
  };

  return (
    <div
      className="cursor-pointer shadow-md shadow-blue-300 flex gap-4 p-3 rounded-md bg-gradient-to-t from-gray-400/70 to-white/70 text-black border-2 border-white/0 hover:border-white/70"
      onClick={handleClick}
    >
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
          <p className="line-clamp-2 my-2">{content}</p>
        </div>
        <Divider className="bg-blue-300 h-[2px]" />
        <PostNav post={item.post} />
      </div>
    </div>
  );
};

export default PostCard;
