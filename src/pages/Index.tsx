import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

const Index = () => {
  const location = useLocation().pathname;
  const [displayLocation, setDisplayLocation] = useState<string>(location);
  const [transition, setTransition] = useState("show");

  useEffect(() => {
    if (location !== displayLocation) setTransition("remove");
  }, [location, displayLocation]);

  return (
    <div className="page">
      <div
        className={`${transition}`}
        onAnimationEnd={() => {
          if (transition === "remove") {
            setTransition("show");
            setDisplayLocation(location);
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
