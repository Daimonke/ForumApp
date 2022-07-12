import { Divider } from "@mui/material";

const Register = () => {
  const inputClass =
    "outline-none py-2 px-5 border-2 border-blue-300 rounded-md focus:border-blue-500 text-gray-100 bg-black placeholder-gray-400";
  return (
    <div className="mt-[10vh] py-2 px-5">
      <form className="flex flex-col max-w-xl m-auto gap-5 p-10 border-2 rounded-md shadow-md shadow-gray-500 bg-gradient-to-b from-slate-800 to-gray-600">
        <p className="text-center">Join our community!</p>
        <Divider className="bg-slate-200" />
        <input
          type="text"
          placeholder="Username"
          name="username"
          className={inputClass}
          autoComplete="username"
        />
        <input
          className={inputClass}
          type="password"
          placeholder="Password"
          name="password"
          autoComplete="new-password"
        />
        <input
          className={inputClass}
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          autoComplete="new-password"
        />
        <input
          type="submit"
          value="Signup"
          className="cursor-pointer py-2 px-2 mt-5 mx-10 border-b-2 font-bold border-blue-600 rounded-md shadow-md shadow-blue-800 
            transition-all duration-200 text-gray-900 text-lg bg-blue-300 hover:bg-blue-400 hover:border-blue-800"
        />
      </form>
    </div>
  );
};

export default Register;
