import classes from "./Navbar.module.css";
import { Logo } from "./logo/Logo";
import { Hamburger } from "./hamburger/Hamburger";
import { DesktopNavMenu } from "./desktopNavMenu/DesktopNavMenu";
import { useLocation } from "react-router-dom";
import { Avatar } from "./avatar/Avatar";

export const Navbar = () => {
  let { pathname } = useLocation();
  return (
    <nav>
      <div className={classes["navbar"]}>
        {pathname.slice(0, 9) === "/catagory" && <Hamburger />}
        {pathname.slice(0, 9) !== "/catagory" && <Logo />}
        <div className={classes["alignment-div"]}></div>
        <Avatar />
      </div>
      <DesktopNavMenu />
    </nav>
  );
};
