import { Alert, CircularProgress } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../context/Context";

const PostForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    error: "",
    loading: false,
  });

  const { title, content, error, loading } = formData;

  const ctx = useContext(context);

  const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
    setFormData({ ...formData, loading: true });
    e.preventDefault();
    const data = await fetch("content/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });
    const dataJson = await data.json();
    console.log(dataJson);
    if (dataJson.success === false) {
      setFormData({
        ...formData,
        error: dataJson.message,
        loading: false,
      });
    } else {
      setFormData({
        title: "",
        content: "",
        error: "",
        loading: false,
      });
      ctx.setUpdate(!ctx.update);
      navigate(`/post/${dataJson.inserted_id}`);
    }
  };

  const inputClass =
    "w-full outline-none py-2 px-5 border-2 border-blue-300 rounded-md focus:border-blue-500 text-gray-100 bg-black/50 placeholder-gray-400";
  return (
    <>
      <form
        onSubmit={sendForm}
        className="flex flex-col items-center max-w-xl m-auto gap-5 px-10 py-5 border-2 rounded-md shadow-md shadow-gray-500 bg-gradient-to-b from-slate-800 to-gray-600"
      >
        <p className="text-center">Create a new Post!</p>
        <span className="w-full border-b-2 border-slate-400"></span>
        <input
          type="text"
          placeholder="Title"
          name="title"
          className={inputClass}
          autoComplete="off"
          value={title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <textarea
          className={inputClass}
          placeholder="Content"
          name="content"
          autoComplete="off"
          value={content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
        />
        <input
          type="submit"
          value="POST"
          className="cursor-pointer min-w-fit w-[80%] py-2 px-2 border-b-2 font-bold border-blue-600 rounded-md shadow-md shadow-blue-800 
            transition-all duration-200 text-gray-900 text-lg bg-blue-300 hover:bg-blue-400 hover:border-blue-800"
          disabled={loading}
        />
        {loading && <CircularProgress />}
        {error && (
          <Alert
            className="w-[80%]"
            severity="error"
            onClose={() => setFormData({ ...formData, error: "" })}
          >
            {error}
          </Alert>
        )}
      </form>
    </>
  );
};

export default PostForm;
