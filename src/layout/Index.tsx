/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "../components/universal/Footer";
import Header from "../components/universal/Header";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NewPost from "../pages/NewPost";
import Post from "../pages/Post";
import Register from "../pages/Register";

const Index = () => {
  const location = useLocation().pathname;
  const [displayLocation, setDisplayLocation] = useState<string>(location);
  const [transition, setTransition] = useState("show");
  const [isVisible, setIsVisible] = useState(false);

  const pageAnimation = () => {
    if (transition === "remove") {
      const header = document.querySelector("header") as HTMLElement;
      const headerH = header.offsetHeight;

      setDisplayLocation(location);
      setIsVisible(true);
      setTransition("show");
      if (window.scrollY > headerH) {
        setTimeout(() => {
          window.scrollTo({ top: headerH, behavior: "smooth" });
        }, 100);
      }
    }
  };

  useEffect(() => {
    if (location !== displayLocation) {
      setTransition("remove");
    }
  }, [location]);

  return (
    <div className="page">
      <Header isVisible={isVisible} setIsVisible={setIsVisible} />
      <div className={transition} onAnimationEnd={pageAnimation}>
        <Routes location={displayLocation}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/newpost" element={<NewPost />} />
          <Route path="/post/:id" element={<Post />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
