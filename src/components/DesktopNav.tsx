import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {
  links: {
    name?: string;
    path?: string;
    divider?: boolean;
  }[];
  classes?: string;
};

const DesktopNav = ({ links, classes }: Props) => {
  const location = useLocation().pathname;
  const [active, setActive] = useState<string | null>(location);

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
                className={
                  "px-3 py-1 border-b-2 border-b-black text-gray-100 text-xl" +
                  " " +
                  (link.path === active ? "border-b-red-500" : "")
                }
              >
                {link.name?.toUpperCase()}
              </button>
            </Link>
          </div>
        )
      )}
    </div>
  );
};

export default DesktopNav;
