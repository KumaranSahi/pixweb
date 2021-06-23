import classes from "./Dropdown.module.css";
import { VideoNameList, PlaylistNameList } from "../../../../../components";
import { useLocation } from "react-router-dom";

export const Dropdown = ({ open, closeDropDown }) => {
  const { pathname } = useLocation();
  return open ? (
    <div className={classes["dropdown-menu"]}>
      {pathname.slice(0, 9) === "/catagory" && (
        <VideoNameList closeDropDown={closeDropDown} />
      )}
      {pathname === "/my-playlist" && (
        <PlaylistNameList closeDropDown={closeDropDown} />
      )}
    </div>
  ) : null;
};
