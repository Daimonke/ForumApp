import { Divider, IconButton } from "@mui/material";
import { useState } from "react";
import UserCard from "../auth/UserCard";
import CommentNav from "./CommentNav";
import { CommentData } from "./CommentsBody";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import URL from "../../uri";
import EditedModal from "../universal/EditedModal";

type Props = {
  data: CommentData;
  comments: CommentData[];
  setComments: (comments: CommentData[]) => void;
};

const CommentCard = ({ data, comments, setComments }: Props) => {
  const { comment, id, original_comment } = data.comment;
  const [editingMode, setEditingMode] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [editValue, setEditValue] = useState(comment);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setError(false);
    setEditingMode(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditValue(e.target.value);
    if (error) setError(false);
  };

  const patchCommentState = async () => {
    setComments(
      comments.map((item) =>
        item.comment.id === id
          ? {
              ...item,
              comment: {
                ...item.comment,
                comment: editValue,
              },
            }
          : item
      )
    );
  };

  const handleEdit = async () => {
    if (editValue === comment) return handleClose();
    if (editValue.length < 1) return setError(true);
    const oldComments = comments;
    patchCommentState();
    handleClose();
    const response = await fetch(`${URL}/content/comments/${id}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: editValue,
        original_comment: comment,
      }),
    });
    const data = await response.json();
    if (data.success === false) {
      setComments(oldComments);
    }
  };

  return (
    <div className="shadow-md shadow-black flex gap-4 p-3 rounded-md bg-gradient-to-t from-black/60 to-gray-600/60 text-gray-100 relative">
      <UserCard user={data.user} styles={"!justify-start"} />
      {original_comment && !editingMode && (
        <button
          className="cursor-pointer h-fit w-fit absolute top-1 right-2 text-xs md:text-sm text-green-500"
          onClick={() => setOpen(true)}
        >
          Edited
        </button>
      )}
      <div className="flex justify-start flex-col w-full overflow-hidden">
        <div className="h-full flex">
          <textarea
            className={`${
              editingMode ? "fadeIn" : "hidden"
            } py-2 px-3 w-full h-[90%] outline-none border-2 border-blue-300 rounded-md focus:border-blue-500 text-gray-100 bg-black/50 placeholder-gray-400 ${
              error ? "border-red-500" : ""
            }`}
            onAnimationEnd={() => setFirstLoad(false)}
            value={editValue}
            onChange={handleChange}
          />
          <div
            className={`${
              editingMode ? "fadeIn" : "hidden"
            } flex flex-col justify-center h-[90%]`}
          >
            <IconButton onClick={handleEdit}>
              <CheckBoxRoundedIcon
                fontSize="large"
                className="text-green-600"
              />
            </IconButton>
            <IconButton onClick={handleClose}>
              <DisabledByDefaultRoundedIcon
                fontSize="large"
                className="text-red-600/90"
              />
            </IconButton>
          </div>
          <p
            className={`my-2 ${
              editingMode
                ? "hidden"
                : !editingMode && !firstLoad
                ? "fadeIn"
                : ""
            }`}
          >
            {comment}
          </p>
        </div>
        <Divider className="bg-blue-300 h-[2px]" />
        <CommentNav
          comment={data.comment}
          comments={comments}
          setComments={setComments}
          setEditingMode={setEditingMode}
        />
      </div>
      <EditedModal open={open} setOpen={setOpen} comment={data} />
    </div>
  );
};

export default CommentCard;
