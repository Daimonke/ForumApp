import { Divider } from "@mui/material";
import UserCard from "../auth/UserCard";
import CommentNav from "./CommentNav";
import { CommentData } from "./CommentsBody";

type Props = {
  data: CommentData;
  comments: CommentData[];
  setComments: (comments: CommentData[]) => void;
};

const CommentCard = ({ data, comments, setComments }: Props) => {
  const { comment } = data.comment;

  return (
    <div className="shadow-md shadow-blue-300 flex gap-4 p-3 rounded-md bg-gradient-to-t from-black/60 to-gray-600/60 text-gray-100">
      <UserCard user={data.user} styles={"!justify-start"} />
      <div className="flex justify-start flex-col w-full overflow-hidden relative">
        <div className="h-full">
          <p className="my-2">{comment}</p>
        </div>
        <Divider className="bg-blue-300 h-[2px]" />
        <CommentNav
          comment={data.comment}
          comments={comments}
          setComments={setComments}
        />
      </div>
    </div>
  );
};

export default CommentCard;
