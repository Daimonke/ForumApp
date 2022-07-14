import React from "react";

const Footer = () => {
  return (
    <div className="h-10 absolute bottom-0 left-0 right-0 bg-slate-900 flex items-center justify-center border-t-2 border-blue-600">
      {/* External Link */}
      <a
        href="https://github.com/Daimonke"
        target="_blank"
        rel="noreferrer"
        className="text-blue-200 hover:text-blue-400 no-underline"
      >
        © Daimonke
      </a>
    </div>
  );
};

export default Footer;
