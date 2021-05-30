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
    videoLoading,
  } = useVideo();

  const likedButtonClicked = () => {
    if (token) {
      removeLikeFromVideo({
        like: selectedVideo.likes.filter(({ by }) => by === userId)[0],
        setLoading: setVideoLoading,
        token: token,
        dispatch: videoDispatch,
      });
    } else push("/login");
  };

  const likeButtonClicked = () => {
    if (token) {
      addLikeToVideo({
        videoId: selectedVideo._id,
        setLoading: setVideoLoading,
        token: token,
        dispatch: videoDispatch,
      });
    } else push("/login");
  };

  return (
    <>
      {selectedVideo.likes.some((item) => item.by === userId) ? (
        <button
          className={`${classes["button-solid"]} ${classes["button-solid-primary"]}`}
          disabled={videoLoading}
          onClick={likedButtonClicked}
        >
          Liked ({selectedVideo.likes.length})
        </button>
      ) : (
        <button
          className={`${classes["button-outline"]} ${classes["button-primary"]}`}
          disabled={videoLoading}
          onClick={likeButtonClicked}
        >
          Like ({selectedVideo.likes.length})
        </button>
      )}
    </>
  );
};
