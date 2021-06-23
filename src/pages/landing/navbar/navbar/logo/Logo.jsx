import { Link } from "react-router-dom";
import classes from "./Logo.module.css";
import logo from "../../../../../assets/mk logo finD.png";

export const Logo = () => {
  return (
    <>
      <Link to="/">
        <div className={classes["pixweb-title"]}>
          <img src={logo} className={classes["logo"]} alt="logo" />
          <h1>Pixweb</h1>
        </div>
      </Link>
    </>
  );
};
