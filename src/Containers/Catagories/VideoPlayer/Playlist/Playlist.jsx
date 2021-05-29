import classes from "../VideoPlayer.module.css";
import { useAuth, useVideo } from "../../../../Store";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faCheck } from "@fortawesome/free-solid-svg-icons";
import {useState} from 'react'

export const Playlist = ({ setOpenPlaylist }) => {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const { token } = useAuth();
  const {
    playlists,
    selectedVideo,
    addVideoToPlaylist,
    setVideoLoading,
    videoDispatch,
    swapPlaylist,
    removeFromPlaylist,
    addNewPlaylist,
  } = useVideo();
  const { push } = useHistory();

  const addPlaylist = async () => {
    if (newPlaylistName.length > 0) {
      addNewPlaylist({
        newPlaylistName: newPlaylistName,
        setLoading: setVideoLoading,
        token: token,
        dispatch: videoDispatch,
        playlists: playlists,
      });
      setNewPlaylistName("");
    } else {
      alert("Please Enter a Name");
    }
  };

  const playlistItemClicked = (selectedVideo, selectedPlaylist) => {
    let currentPlaylist = null;
    playlists.forEach((playlist) => {
      if (playlist.videos.some((item) => item._id === selectedVideo._id))
        currentPlaylist = playlist._id;
    });
    if (!currentPlaylist) {
      addVideoToPlaylist({
        selectedVideo: selectedVideo,
        selectedPlaylist: selectedPlaylist,
        token: token,
        playlists: playlists,
        setLoading: setVideoLoading,
        dispatch: videoDispatch,
      });
    } else if (currentPlaylist !== selectedPlaylist.id) {
      swapPlaylist({
        selectedVideo: selectedVideo,
        selectedPlaylist: selectedPlaylist,
        token: token,
        playlists: playlists,
        setLoading: setVideoLoading,
        dispatch: videoDispatch,
      });
    } else if (currentPlaylist === selectedPlaylist._id) {
      removeFromPlaylist({
        selectedVideo: selectedVideo,
        selectedPlaylist: selectedPlaylist,
        token: token,
        playlists: playlists,
        setLoading: setVideoLoading,
        dispatch: videoDispatch,
      });
    }
  };

  return (
    <ul className={classes["watchlist-dropdown"]}>
      {playlists.map((item) => (
        <li
          key={item._id}
          onClick={() => {
            if (token) {
              playlistItemClicked(selectedVideo, item);
              setOpenPlaylist((status) => !status);
            } else {
              push("/login");
            }
          }}
          className={
            item.videos.some((item) => item._id === selectedVideo._id)
              ? classes["video-active"]
              : null
          }
        >
          <p>{item.name}</p>
          {item.videos.some((item) => item._id === selectedVideo._id) && (
            <FontAwesomeIcon icon={faCheck} />
          )}
        </li>
      ))}
      <li>
        <form
          className={classes["add-new-playlist"]}
          onSubmit={(event) => {
            event.preventDefault();
            if (token) {
              addPlaylist(newPlaylistName);
            } else {
              push("/login");
            }
          }}
        >
          <input
            type="text"
            className={classes["textbox"]}
            placeholder="Add New Playlist"
            value={newPlaylistName}
            onChange={(event) => setNewPlaylistName(event.target.value)}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faPlusCircle} />
          </button>
        </form>
      </li>
    </ul>
  );
};
