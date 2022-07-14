import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Index = () => {
  const location = useLocation().pathname;
  const [displayLocation, setDisplayLocation] = useState<string>(location);
  const [transition, setTransition] = useState("show");
  const [isVisible, setIsVisible] = useState(false);

  const pageAnimation = () => {
    if (transition === "remove") {
      setTransition("show");
      setDisplayLocation(location);
      // if (location !== "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      // }
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
      <div className={transition + " h-full"} onAnimationEnd={pageAnimation}>
        <Routes location={displayLocation}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
