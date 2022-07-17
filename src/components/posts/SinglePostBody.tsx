import { Divider } from "@mui/material";
import { PostsData } from "../../context/Context";
import UserCard from "../auth/UserCard";
import PostNav from "./PostNav";

type Props = {
  post: PostsData;
};

const SinglePostBody = ({ post }: Props) => {
  const { title, content, created_at } = post.post;

  return (
    <div className="grayShadow flex gap-4 p-3 rounded-md bg-gradient-to-t from-gray-300/70 to-white/70 text-black min-h-[30vh]">
      <UserCard user={post.user} styles={"!justify-start"} />
      <div className="flex flex-col overflow-hidden w-full justify-between">
        <div className="flex justify-between items-start gap-2">
          <h1 className="text-2xl font-bold text-ellipsis overflow-hidden line-clamp-2">
            {title}
          </h1>
          <p className="text-xs md:text-sm w-fit whitespace-nowrap pt-1">
            {created_at.split(" ")[0]}
          </p>
        </div>
        <Divider className="bg-blue-300 h-[2px]" />

        <div className="h-full">
          <p className="my-2">{content}</p>
        </div>
        <Divider className="bg-blue-300 h-[2px]" />
        <PostNav post={post.post} disableCommentBtn />
      </div>
    </div>
  );
};

export default SinglePostBody;
