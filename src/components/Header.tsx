import { Container, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

type Links = (
  | {
      name: string;
      path: string;
    }
  | {
      divider: boolean;
    }
)[];

type Props = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

const Header = ({ isVisible, setIsVisible }: Props) => {
  const md = useMediaQuery("(min-width:768px)");
  const [windowScroll, setWindowScroll] = useState(window.scrollY);
  const [headerHeight, setHeaderHeight] = useState(0);

  const links: Links = [
    {
      name: "Home",
      path: "/",
    },
    {
      divider: true,
    },
    {
      name: "Login",
      path: "/login",
    },
    {
      name: "Signup",
      path: "/register",
    },
  ];

  window.onscroll = () => {
    setWindowScroll(window.scrollY);
  };
  const isInViewport = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    return rect.height >= windowScroll - 10;
  };
  useEffect(() => {
    const header = document.querySelector("header") as HTMLElement;
    setHeaderHeight(header.offsetHeight);
    if (isInViewport(header)) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [setIsVisible, windowScroll]);

  return (
    <header
      className={`bg-gradient-to-t from-slate-600 to-gray-300 border-b-2 border-gray-200 ${
        isVisible ? "fadeIn" : ""
      }`}
    >
      <Container className="relative bg">
        <div className="flex justify-center items-center flex-col m-auto">
          <Link to="/">
            <img src={logo} alt="logo" className="h-32 md:h-64"></img>
          </Link>
          {md ? <DesktopNav links={links} /> : <MobileNav links={links} />}
          {md && !isVisible ? (
            <DesktopNav
              links={links}
              classes={`fixed z-10 top-0 bg-gradient-to-t from-slate-600 to-gray-300 w-full justify-center fadeIn transition-all max-h-[${headerHeight}px]`}
            />
          ) : !md && !isVisible ? (
            <MobileNav
              links={links}
              classes={"fixed z-10 top-4 right-5 text-white fadeIn"}
            />
          ) : null}
        </div>
      </Container>
    </header>
  );
};

export default Header;
