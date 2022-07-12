import { Alert, CircularProgress, Collapse } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    error: "",
    message: "",
    loading: false,
  });

  const { username, password, confirmPassword, error, loading, message } =
    formData;

  const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData({ ...formData, loading: true });
    const url = `auth/register`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, confirmPassword }),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.success === false) {
      setFormData({
        ...formData,
        error: data.message,
        message: "",
        loading: false,
      });
    } else {
      setFormData({
        username: "",
        password: "",
        confirmPassword: "",
        error: "",
        message: data.message,
        loading: false,
      });
    }
  };

  const inputClass =
    "w-full outline-none py-2 px-5 border-2 border-blue-300 rounded-md focus:border-blue-500 text-gray-100 bg-black placeholder-gray-400";
  return (
    <div className="mt-[7vh] py-2 px-5 sm:px-20">
      <form
        onSubmit={sendForm}
        className="flex flex-col items-center max-w-xl m-auto gap-5 px-10 py-5 border-2 rounded-md shadow-md shadow-gray-500 bg-gradient-to-b from-slate-800 to-gray-600"
      >
        <p className="text-center">Join our community!</p>
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
          autoComplete="new-password"
          value={password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <input
          className={inputClass}
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />
        <input
          type="submit"
          value="Signup"
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
        {message && (
          <Alert
            className="w-[80%]"
            severity="info"
            onClose={() => navigate("/")}
          >
            {message}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default Register;
