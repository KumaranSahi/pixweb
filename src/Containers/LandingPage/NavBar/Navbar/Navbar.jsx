import classes from "./Navbar.module.css";
import { Logo } from "./Logo/Logo";
import { Hamburger } from "./Hamburger/Hamburger";
import { DesktopNavMenu } from "./DesktopNavMenu/DesktopNavMenu";
import { useLocation } from "react-router-dom";
import { Avatar } from "./Avatar/Avatar";

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
