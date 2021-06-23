import classes from "./MobileNavbar.module.css";
import { faHome, faHistory, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export const MobileNavbar = () => {
  return (
    <div className={classes["mobile-nav-bar"]}>
      <p className={classes["nav-button"]}>
        <NavLink to="/" exact activeClassName={classes["active-mobile"]}>
          <FontAwesomeIcon icon={faHome} />
        </NavLink>
      </p>
      <p className={classes["nav-button"]}>
        <NavLink to="/my-playlist" activeClassName={classes["active-mobile"]}>
          <FontAwesomeIcon icon={faList} />
        </NavLink>
      </p>
      <p className={classes["nav-button"]}>
        <NavLink to="/history" activeClassName={classes["active-mobile"]}>
          <FontAwesomeIcon icon={faHistory} />
        </NavLink>
      </p>
    </div>
  );
};
