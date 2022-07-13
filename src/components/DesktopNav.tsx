import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { context } from "../Context";
import AccountMenu from "./AccountMenu";

type Props = {
  links: {
    name?: string;
    path?: string;
    divider?: boolean;
  }[];
  classes?: string;
  font?: string;
};

const DesktopNav = ({ links, classes, font }: Props) => {
  const location = useLocation().pathname;
  const [active, setActive] = useState<string | null>(location);
  const ctx = useContext(context);
  const btnClasses = `flex align-middle px-3 py-1 border-b-2  text-gray-100 text-xl ${font} `;

  useEffect(() => {
    setActive(location);
  }, [location]);

  return (
    <div className={`flex gap-5 p-4 ${classes}`}>
      {links.map((link, index) =>
        link.divider ? null : (
          <div className="transition-all hover:-translate-y-1" key={index}>
            <Link to={link.path!}>
              <button
                className={`
                px-3 py-1 border-b-2  text-gray-100 text-xl ${font} ${
                  link.path === active ? "border-b-red-600" : "border-b-black"
                }`}
              >
                {link.name?.toUpperCase()}
              </button>
            </Link>
          </div>
        )
      )}
      {ctx.user && (
        <>
          <span className="border-r-[1px]"></span>
          <AccountMenu classes={btnClasses} />
        </>
      )}
    </div>
  );
};

export default DesktopNav;
