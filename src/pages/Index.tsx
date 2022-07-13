import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

const Index = () => {
  const location = useLocation().pathname;
  const [displayLocation, setDisplayLocation] = useState<string>(location);
  const [transition, setTransition] = useState("show");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (location !== displayLocation) {
      setTransition("remove");
      setIsVisible(true);
    }
  }, [location, displayLocation]);

  return (
    <div className="page">
      <Header isVisible={isVisible} setIsVisible={setIsVisible} />
      <div
        className={`${transition}`}
        onAnimationEnd={() => {
          if (transition === "remove") {
            setTransition("show");
            setDisplayLocation(location);
            if (location !== "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              window.scrollTo({ top: window.scrollY - 1, behavior: "smooth" });
            }
          }
        }}
      >
        <Routes location={displayLocation}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
};

export default Index;
