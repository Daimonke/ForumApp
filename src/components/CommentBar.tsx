import React from "react";

type Props = {};

const CommentBar = (props: Props) => {
  return (
    <div className="w-full flex bg-slate-600 rounded-md mt-3 mb-2 p-3">
      <textarea
        className="w-full p-2 rounded-md border-2 border-gray-600 text-black"
        placeholder="Write a comment..."
        rows={1}
      />
      <button className="w-[30%] p-2 rounded-md border-[1px] border-white bg-gradient-to-r from-blue-700/80 to-sky-800/80">
        <span className="text-gray-200 font-bold">Post</span>
      </button>
    </div>
  );
};

export default CommentBar;
