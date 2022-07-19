import { Divider, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import { context, PostsData } from "../../context/Context";
import UserCard from "../auth/UserCard";
import PostNav from "./PostNav";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import URL from "../../uri";
import EditedModal from "../universal/EditedModal";

type Props = {
  post: PostsData;
};

const SinglePostBody = ({ post }: Props) => {
  const { title, content, created_at, id, original_content, original_title } =
    post.post;
  const ctx = useContext(context);
  const [editingMode, setEditingMode] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [contentValue, setContentValue] = useState(content);
  const [titleValue, setTitleValue] = useState(title);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setError(false);
    setEditingMode(false);
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentValue(e.target.value);
    if (error) setError(false);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
    if (error) setError(false);
  };

  const handleEdit = async () => {
    if (contentValue === content && titleValue === title) return handleClose();
    if (contentValue.length < 1 || titleValue.length < 1) return setError(true);
    const oldPost = post;
    ctx.setPosts(
      ctx.posts.map((item) =>
        item.post.id === id
          ? {
              post: {
                ...item.post,
                content: contentValue,
                title: titleValue,
                original_title: title,
                original_content: content,
              },
              user: { ...item.user },
            }
          : item
      )
    );
    handleClose();

    const response = await fetch(`${URL}/content/posts/${id}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleValue,
        content: contentValue,
      }),
    });
    const data = await response.json();
    if (data.success === false) {
      ctx.setPosts(
        ctx.posts.map((item) => (item.post.id === id ? oldPost : item))
      );
    }
  };

  return (
    <div className="grayShadow flex gap-4 p-3 rounded-md bg-gradient-to-t from-gray-300/70 to-white/70 text-black min-h-[30vh] relative">
      <UserCard user={post.user} styles={"!justify-start"} />
      {(original_content || original_title) && !editingMode ? (
        <button
          className="cursor-pointer absolute h-fit w-fit top-1 right-3 block text-xs md:text-sm text-red-700"
          onClick={() => setOpen(true)}
        >
          Edited
        </button>
      ) : null}
      <div className="flex flex-col overflow-hidden w-full justify-between">
        <div className="flex justify-between items-start gap-2">
          <input
            type="text"
            className={`${
              editingMode ? "fadeIn" : "hidden"
            } py-2 px-3 w-full h-[90%] outline-none border-2 border-blue-300 rounded-md focus:border-blue-500 text-gray-100 bg-black/80 placeholder-gray-400 ${
              error ? "border-red-500" : ""
            }`}
            onAnimationEnd={() => setFirstLoad(false)}
            value={titleValue}
            onChange={handleTitle}
          />
          <h1
            className={`text-2xl font-bold ${
              editingMode
                ? "hidden"
                : !editingMode && !firstLoad
                ? "fadeIn"
                : ""
            }`}
          >
            {title}
          </h1>
          <p
            className={`text-xs md:text-sm w-fit whitespace-nowrap ${
              original_content || original_title ? "pt-3" : "pt-1"
            }`}
          >
            {created_at.split(" ")[0]}
          </p>
        </div>
        <Divider className="bg-blue-300 h-[2px]" />

        <div className="h-full flex pt-2">
          <textarea
            className={`${
              editingMode ? "fadeIn" : "hidden"
            } py-2 px-3 w-full h-[90%] outline-none border-2 border-blue-300 rounded-md focus:border-blue-500 text-gray-100 bg-black/80 placeholder-gray-400 ${
              error ? "border-red-500" : ""
            }`}
            onAnimationEnd={() => setFirstLoad(false)}
            value={contentValue}
            onChange={handleContent}
          />
          <div
            className={`${
              editingMode ? "fadeIn" : "hidden"
            } flex flex-col justify-center h-[90%]`}
          >
            <IconButton onClick={handleEdit}>
              <CheckBoxRoundedIcon
                fontSize="large"
                className="text-green-700"
              />
            </IconButton>
            <IconButton onClick={handleClose}>
              <DisabledByDefaultRoundedIcon
                fontSize="large"
                className="text-red-700/90"
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
            {content}
          </p>
        </div>
        <Divider className="bg-blue-300 h-[2px]" />
        <PostNav
          post={post.post}
          disableCommentBtn
          setEditingMode={setEditingMode}
          editingMode={editingMode}
        />
      </div>
      <EditedModal open={open} setOpen={setOpen} post={post} />
    </div>
  );
};

export default SinglePostBody;
