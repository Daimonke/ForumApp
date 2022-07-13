import { Alert, CircularProgress } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../Context";

const Login = () => {
  const navigate = useNavigate();
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
    ctx.setUser(false);
    setFormData({ ...formData, loading: true });
    const url = `auth/login`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };
    const response = await fetch(url, options);
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
        username: username,
      });
      setFormData({
        username: "",
        password: "",
        error: "",
        loading: false,
      });
      navigate("/");
    }
  };

  const inputClass =
    "autofill:bg-yellow-500 w-full outline-none py-2 px-5 border-2 border-blue-300 rounded-md focus:border-blue-500 text-gray-100 bg-black placeholder-gray-400";
  return (
    <div className="mt-[7vh] py-2 px-5 sm:px-20">
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
          value="Login"
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
    </div>
  );
};

export default Login;
