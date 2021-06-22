import classes from "./Avatar.module.css";
import { useState } from "react";
import { useAuth } from "../../../../../store";
import profileImage from "../../../../../Assets/profileimage.jpg";
import { Link, useLocation } from "react-router-dom";
import { Menu, MenuItem } from "@material-ui/core";

export const Avatar = () => {
  const { userName, signOutUser, authDispatch } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signOutUser({ dispatch: authDispatch });
    handleClose();
  };

  let avatar = null;
  let { pathname } = useLocation();
  if (userName) {
    avatar = (
      <>
        <div className={classes["name-avatar-container"]} onClick={handleClick}>
          <p>Hello, {userName}</p>
          <div className={classes["avatar-container"]}>
            <img
              src={profileImage}
              className={classes["avatar"]}
              alt="Active avatar"
            />
            <div
              className={`${classes["avatar-bubble"]} ${classes["bubble-active"]}`}
            ></div>
          </div>
        </div>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </>
    );
  } else {
    avatar = pathname !== "/login" && (
      <div className={classes["name-avatar-container"]}>
        <Link to="/login">Login</Link>
      </div>
    );
  }

  return <div>{avatar}</div>;
};
