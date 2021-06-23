import classes from "./History.module.css";
import { useVideo } from "../../store";
import { useHistory } from "react-router-dom";

export const HistoryPage = () => {
  const { push } = useHistory();
  const { history, selectVideo, videoDispatch, setVideoLoading } = useVideo();
  return (
    <div className={classes["history-container"]}>
      <h1>History:</h1>
      <ul className={classes["history-videolist"]}>
        {history.map((video) => (
          <li key={video._id} className={classes["videolist-item"]}>
            <img
              src={`https://img.youtube.com/vi/${video.link}/0.jpg`}
              alt="thumbnail"
              onClick={() => {
                selectVideo({
                  videoId: video._id,
                  dispatch: videoDispatch,
                  setLoading: setVideoLoading,
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
