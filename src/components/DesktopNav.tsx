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
          <Link key={index} to={link.path!}>
            <button
              className={
                "px-3 py-0 border-b-2 border-b-yellow-400 transition-all hover:-translate-y-1 text-gray-800 text-xl h-full " +
                (link.path === active ? "border-b-blue-400" : "")
              }
            >
              {link.name}
            </button>
          </Link>
        )
      )}
    </div>
  );
};

export default DesktopNav;
