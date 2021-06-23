import classes from "./VideoNameList.module.css";
import { useVideo } from "../../store";

export const VideoNameList = ({ closeDropDown }) => {
  const {
    videosByCatagory,
    selectedVideo,
    selectVideo,
    videoDispatch,
    setVideoLoading,
  } = useVideo();
  return (
    <ul className={classes["video-name-list"]}>
      {videosByCatagory &&
        videosByCatagory.map((item) => (
          <li
            key={item._id}
            onClick={() => {
              selectVideo({
                videoId: item._id,
                dispatch: videoDispatch,
                setLoading: setVideoLoading,
              });
              closeDropDown && closeDropDown();
            }}
            className={
              selectedVideo && selectedVideo._id === item._id
                ? classes["video-active"]
                : null
            }
          >
            <p>{item.name}</p>
          </li>
        ))}
    </ul>
  );
};
