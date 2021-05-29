import classes from "../VideoPlayer.module.css";
import { useAuth, useVideo } from "../../../../Store";
import { useHistory } from "react-router-dom";

export const Likes = () => {
  const { userId, token } = useAuth();
  const { push } = useHistory();
  const {
    selectedVideo,
    removeLikeFromVideo,
    setVideoLoading,
    addLikeToVideo,
    videoDispatch,
  } = useVideo();
  return (
    <>
      {selectedVideo.likes.some((item) => item.by === userId) ? (
        <button
          className={`${classes["button-solid"]} ${classes["button-solid-primary"]}`}
          onClick={() => {
            if (token) {
              removeLikeFromVideo({
                like: selectedVideo.likes.filter(({ by }) => by === userId)[0],
                setLoading: setVideoLoading,
                token: token,
                dispatch: videoDispatch,
              });
            } else push("/login");
          }}
        >
          Liked ({selectedVideo.likes.length})
        </button>
      ) : (
        <button
          className={`${classes["button-outline"]} ${classes["button-primary"]}`}
          onClick={() => {
            if (token) {
              addLikeToVideo({
                videoId: selectedVideo._id,
                setLoading: setVideoLoading,
                token: token,
                dispatch: videoDispatch,
              });
            } else push("/login");
          }}
        >
          Like ({selectedVideo.likes.length})
        </button>
      )}
    </>
  );
};
