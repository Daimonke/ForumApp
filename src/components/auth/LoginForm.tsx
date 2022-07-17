import { Alert, Collapse, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { context } from "../../context/Context";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import URL from "../../uri";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    error: "",
    loading: false,
  });

  const { username, password, error, loading } = formData;

  const ctx = useContext(context);

  const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.length < 4 || password.length < 4) {
      setFormData({
        ...formData,
        error: "Invalid username or password",
      });
      return;
    }

    ctx.setUser(false);
    setFormData({ ...formData, loading: true });
    const response = await fetch(`${URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.success === false) {
      setFormData({
        ...formData,
        error: data.message,
        loading: false,
      });
      ctx.setUser(null);
    } else {
      ctx.setUser({
        id: data.id,
        username: data.username,
        avatar: data.avatar,
        userPostsCount: data.userPostsCount,
      });
      setFormData({
        username: "",
        password: "",
        error: "",
        loading: false,
      });
      const lastPath = location.state as string;
      if (lastPath) {
        lastPath.includes("post/") ? navigate(lastPath) : navigate("/");
      } else {
        navigate("/");
      }
    }
    ctx.setUpdate(!ctx.update);
  };

  const inputClass =
    "w-full outline-none py-2 px-5 border-2 border-blue-300 rounded-md focus:border-blue-500 text-gray-100 bg-black/50 placeholder-gray-400";
  return (
    <>
      <form
        onSubmit={sendForm}
        className="flex flex-col items-center max-w-xl m-auto gap-5 px-10 py-5 border-2 rounded-md shadow-md shadow-gray-500 bg-gradient-to-b from-slate-800 to-gray-600"
      >
        <p className="text-center">Login to communicate with others!</p>
        <span className="w-full border-b-2 border-slate-400"></span>
        <input
          type="text"
          placeholder="Username"
          name="username"
          className={inputClass}
          autoComplete="username"
          value={username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <input
          className={inputClass}
          type="password"
          placeholder="Password"
          name="password"
          autoComplete="password"
          value={password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <input
          type="submit"
          value="LOGIN"
          className="cursor-pointer min-w-fit w-[80%] py-2 px-2 border-b-2 font-bold border-blue-600 rounded-md shadow-md shadow-blue-800 
            transition-all duration-200 text-gray-900 text-lg bg-blue-300 hover:bg-blue-400 hover:border-blue-800"
          disabled={loading}
        />
        <Collapse in={!!error} sx={{ width: "80%" }}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setFormData({ ...formData, error: "" });
                }}
              >
                <CloseRoundedIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Collapse>
      </form>
    </>
  );
};

export default LoginForm;
