/* eslint-disable react-hooks/exhaustive-deps */
import {
  Container,
  LinearProgress,
  Skeleton,
  useMediaQuery,
} from "@mui/material";
import { useContext, useEffect, useMemo } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { context } from "../../context/Context";
import logo from "../../images/logo.png";
import DesktopNav from "../navigation/DesktopNav";
import MobileNav from "../navigation/MobileNav";

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
  const ctx = useContext(context);

  const [windowScroll, setWindowScroll] = useState(window.scrollY);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const offlineLinks = useMemo(
    () => [
      { name: "Login", path: "/login" },
      { name: "Signup", path: "/register" },
    ],
    []
  );

  const mainLinks = useMemo(
    () => [{ name: "Home", path: "/" }, { divider: true }],
    []
  );
  const onlineLinks = useMemo(
    () => [{ name: "New Post", path: "/newpost" }, { divider: true }],
    []
  );

  const [links, setLinks] = useState<Links>([...mainLinks, ...offlineLinks]);

  useEffect(() => {
    if (ctx.user) {
      setLinks([...mainLinks, ...onlineLinks]);
    } else {
      setLinks([...mainLinks, ...offlineLinks]);
    }
  }, [ctx.user, mainLinks, offlineLinks]);

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
          <span className={`${!isVisible ? "fadeOut" : ""}`}>
            <Link to="/">
              {!imageLoaded && (
                <Skeleton
                  variant="circular"
                  width={md ? "190px" : "90px"}
                  height={md ? "190px" : "90px"}
                  sx={{ m: 4.5 }}
                />
              )}
              <img
                src={logo}
                alt="logo"
                className={`h-32 md:h-64 ${imageLoaded ? "" : "hidden"}`}
                onLoad={() => setImageLoaded(true)}
              ></img>
            </Link>
          </span>
          {ctx.user === false && md ? (
            <div className="w-full py-[33px]">
              <LinearProgress />
            </div>
          ) : md ? (
            <DesktopNav links={links} />
          ) : (
            <MobileNav links={links} />
          )}
          {md && !isVisible ? (
            <DesktopNav
              links={links}
              classes={`fixed p-3 border-b-2 border-gray-400 z-10 top-0 bg-gradient-to-b from-slate-700 to-gray-500 w-full justify-center fadeIn transition-all max-h-[${headerHeight}px]`}
              font={"text-sm py-0"}
            />
          ) : !md && !isVisible ? (
            <MobileNav
              links={links}
              classes={
                "fixed z-10 top-4 right-5 !text-green-500 fadeIn border-2 border-black bg-black/60 rounded-md"
              }
            />
          ) : null}
        </div>
      </Container>
    </header>
  );
};

export default Header;
