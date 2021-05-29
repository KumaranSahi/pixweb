import classes from "./VideoNameList.module.css";
import { useAuth, useVideo } from "../../Store";

const VideoNameList = ({ closeDropDown }) => {
  const {
    videosByCatagory,
    selectedVideo,
    selectVideo,
    videoDispatch,
    setVideoLoading,
  } = useVideo();
  const {
    token
  }=useAuth()
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
                token: token,
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

export default VideoNameList;
