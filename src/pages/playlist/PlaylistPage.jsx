import classes from "./PlaylistPage.module.css";
import { useVideo } from "../../store";
import { PlaylistList } from "./playlistList/PlaylistList";
import { PlaylistNameList } from "../../components";
import { useEffect } from "react";

export const PlaylistPage = () => {
  const { videoDispatch, selectedPlaylist, playlists } = useVideo();

  useEffect(() => {
    if (playlists.length > 0)
      videoDispatch({
        type: "SELECT_PLAYLIST",
        payload: playlists[0],
      });
  }, [playlists, videoDispatch]);

  return (
    <div className={classes["playlist-container"]}>
      <div className={classes["playlist-video-area"]}>
        {selectedPlaylist && (
          <PlaylistList
            id={selectedPlaylist._id}
            name={selectedPlaylist.name}
            videos={selectedPlaylist.videos}
          />
        )}
      </div>
      <div className={classes["playlist-list-area"]}>
        <PlaylistNameList />
      </div>
    </div>
  );
};
