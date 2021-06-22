import classes from "./VideoPlayer.module.css";
import Youtube from "react-youtube";
import { useState } from "react";
import { useAuth, useVideo } from "../../../store";
import { useLocation, useHistory } from "react-router-dom";
import { Notes } from "./Notes/Notes";
import { Likes } from "./Likes/Likes";
import { Playlist } from "./Playlist/Playlist";

export const VideoPlayer = () => {
  const [openPlaylist, setOpenPlaylist] = useState(false);
  const [note, setNote] = useState("");

  const { push } = useHistory();

  const {
    selectedVideo,
    addToHistory,
    addNotes,
    setVideoLoading,
    videoDispatch,
  } = useVideo();

  const { token } = useAuth();

  const { pathname } = useLocation();
  return (
    <div
      className={
        pathname === "/video-player"
          ? classes["video-player-page"]
          : classes["video-player"]
      }
    >
      <h1 className={classes["video-name"]}>{selectedVideo.name}</h1>
      <Youtube
        videoId={selectedVideo.link}
        className={classes["youtube-window"]}
        onPlay={() => {
          addToHistory({
            videoId: selectedVideo._id,
            token: token,
            dispatch: videoDispatch,
          });
        }}
      />
      <div className={classes["options-bar"]}>
        <h2>Author: {selectedVideo.author}</h2>
        <div className={classes["watchlist-dropdown-container"]}>
          <Likes />
          <button
            className={`${classes["button-outline"]} ${classes["button-primary"]}`}
            onClick={() => {
              token ? setOpenPlaylist((status) => !status) : push("/login");
            }}
          >
            Add To Playlist
          </button>
          {openPlaylist && <Playlist setOpenPlaylist={setOpenPlaylist} />}
        </div>
      </div>
      <hr />
      <div className={classes["notes"]}>
        <h2>Notes:</h2>
        {token && (
          <form
            className={classes["add-note"]}
            onSubmit={(event) => {
              event.preventDefault();
              addNotes({
                videoId: selectedVideo._id,
                note: note,
                setLoading: setVideoLoading,
                token: token,
                dispatch: videoDispatch,
              });
              setNote("");
            }}
          >
            <label>
              <p>Add note:</p>
              <div>
                <input
                  placeholder="Add a note"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                />
                <button
                  type="submit"
                  className={`${classes["button-solid"]} ${classes["button-solid-primary"]}`}
                >
                  Add Note
                </button>
              </div>
            </label>
          </form>
        )}
        <ul className={classes["notes-list"]}>
          {selectedVideo.notes &&
            selectedVideo.notes.map(
              ({ _id, content, by: { name: userName, _id: userId } }) => (
                <li key={`${Math.random()}${userName}${content}`}>
                  <Notes
                    name={userName}
                    note={content}
                    id={userId}
                    noteId={_id}
                    videoId={selectedVideo._id}
                  />
                </li>
              )
            )}
        </ul>
      </div>
    </div>
  );
};
