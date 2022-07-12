import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  links: {
    name?: string;
    path?: string;
    divider?: boolean;
  }[];
};

const DesktopNav = ({ links }: Props) => {
  const navigate = useNavigate();
  const [active, setActive] = useState<string | null>(window.location.pathname);

  useEffect(() => {
    setActive(window.location.pathname);
  }, [navigate]);

  return (
    <div className="flex gap-5 p-4">
      {links.map((link, index) =>
        link.divider ? null : (
          <div className="p-1 transition-all hover:-translate-y-0.5">
            <Link key={index} to={link.path!}>
              <button
                className={
                  "px-3 py-0 border-b-2 border-b-black text-gray-100 text-xl" +
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
