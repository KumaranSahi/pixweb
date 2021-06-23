import classes from "./Dropdown.module.css";
import { VideoNameList } from "../../../../videoNameList/VideoNameList";

export const Dropdown = ({ open, closeDropDown }) => {
  return open ? (
    <div className={classes["dropdown-menu"]}>
      <VideoNameList closeDropDown={closeDropDown} />
    </div>
  ) : null;
};
