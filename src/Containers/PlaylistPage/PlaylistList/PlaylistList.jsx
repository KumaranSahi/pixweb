import classes from "./PlaylistList.module.css";
import { useHistory } from "react-router-dom";
import { useVideo, useAuth } from "../../../Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const PlaylistList = ({ name, videos, id }) => {
  const { push } = useHistory();
  const { deletePlaylist, selectVideo, setVideoLoading, videoDispatch } =
    useVideo();
  const { token } = useAuth();
  return (
    <div className={classes["playlist-list"]}>
      <h2>
        {name}
        <FontAwesomeIcon
          icon={faTrash}
          className={classes["delete-playlist"]}
          onClick={() =>
            deletePlaylist({
              playlistid: id,
              setLoading: setVideoLoading,
              token: token,
              dispatch: videoDispatch,
            })
          }
        />
      </h2>
      <ul className={classes["playlist-videolist"]}>
        {videos.map((video) => (
          <li key={video._id} className={classes["videolist-item"]}>
            <img
              src={`https://img.youtube.com/vi/${video.link}/0.jpg`}
              alt="thumbnail"
              onClick={() => {
                selectVideo({
                  videoId: video._id,
                  dispatch: videoDispatch,
                  setLoading: setVideoLoading,
                  token:token,
                });
                push("/video-player");
              }}
            />
            <h3>{video.name}</h3>
            <p>{video.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};