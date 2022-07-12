import { Container, useMediaQuery } from "@mui/material";
import logo from "../images/logo.png";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

type Links = {
  name?: string;
  path?: string;
  divider?: boolean;
}[];

const Header = () => {
  const md = useMediaQuery("(min-width:768px)");

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

  return (
    // <nav className="bg-gradient-to-t from-yellow-100 to-yellow-400 border-b-2 border-gray-200">
    <nav className="bg-gradient-to-t from-slate-600 to-gray-300 border-b-2 border-gray-200">
      <Container className="relative bg">
        <div className="flex justify-center items-center flex-col m-auto">
          <img src={logo} alt="logo" className="h-32 md:h-64"></img>
          {md ? <DesktopNav links={links} /> : <MobileNav links={links} />}
        </div>
      </Container>
    </nav>
  );
};

export default Header;
