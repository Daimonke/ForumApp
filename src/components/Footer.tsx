import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="h-10 absolute bottom-0 left-0 right-0 bg-slate-800 flex items-center justify-center">
      <a
        href="https://github.com/Daimonke"
        target="_blank"
        rel="noreferrer"
        className="text-teal-400 hover:text-teal-200 no-underline"
      >
        © Daimonke
      </a>
    </div>
  );
};

export default Footer;
