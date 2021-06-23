import classes from "./PlaylistNameList.module.css";
import { useVideo } from "../../store";

export const PlaylistNameList = ({ closeDropDown }) => {
  const { selectedPlaylist, videoDispatch, playlists } = useVideo();
  return (
    <ul className={classes["playlist-name-list"]}>
      {playlists &&
        playlists.map((item) => (
          <li
            key={item._id}
            onClick={() => {
              videoDispatch({
                type: "SELECT_PLAYLIST",
                payload: item,
              });
              closeDropDown && closeDropDown();
            }}
            className={
              selectedPlaylist && selectedPlaylist._id === item._id
                ? classes["playlist-active"]
                : null
            }
          >
            <p>{item.name}</p>
          </li>
        ))}
    </ul>
  );
};
