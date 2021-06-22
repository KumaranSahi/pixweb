import { APP_URL } from "../../axiosUtils";
import { successToast, warningToast } from "../../UI/Toast/Toast";
import axios from "axios";

export const VideoReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_VIDEOLIST":
      return {
        ...state,
        fullVideoList: [...action.payload],
      };
    case "CREATE_PLAYLIST":
      return {
        ...state,
        playlists: [...action.payload],
      };
    case "FILTER_VIDEO_BY_CATAGORY":
      return {
        ...state,
        currentCatagoryId: action.payload,
        selectedVideo: null,
      };
    case "SELECT_VIDEO":
      return {
        ...state,
        selectedVideo: { ...action.payload },
      };
    case "ADD_TO_HISTORY":
      return {
        ...state,
        history: [...action.payload],
      };
    default:
      return state;
  }
};

export const loadPlaylist = async ({ dispatch, setLoading }) => {
  setLoading(true);
  try {
    const {
      data: { data },
    } = await axios.get(`${APP_URL}/api/playlists`);
    dispatch({
      type: "CREATE_PLAYLIST",
      payload: [...data],
    });
    setLoading(false);
  } catch (error) {
    warningToast("Unable to load playlists");
    console.log(error);
    setLoading(false);
  }
};

export const loadHistory = async ({ dispatch, setLoading }) => {
  setLoading(true);
  try {
    const { data } = await axios.get(`${APP_URL}/api/histories`);
    dispatch({
      type: "ADD_TO_HISTORY",
      payload: [...data.data],
    });
    setLoading(false);
  } catch (error) {
    warningToast("Unable to load history");
    console.log(error);
    setLoading(false);
  }
};

export const loadVideos = async ({ dispatch, setLoading }) => {
  setLoading(true);
  try {
    const { data } = await axios.get(`${APP_URL}/api/videos`);
    if (data.ok) {
      dispatch({
        type: "CREATE_VIDEOLIST",
        payload: [...data.data],
      });
    }
    setLoading(false);
  } catch (error) {
    warningToast("Unable to load videos");
    console.log(error);
    setLoading(false);
  }
};

export const selectVideo = async ({ videoId, dispatch, setLoading }) => {
  setLoading(true);
  try {
    const { data } = await axios.get(`${APP_URL}/api/videos/${videoId}`);
    if (data.ok) {
      dispatch({
        type: "SELECT_VIDEO",
        payload: data.data,
      });
    }
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
    warningToast("Failed to load video");
  }
};

export const addVideoToPlaylist = async ({
  selectedVideo,
  selectedPlaylist,
  playlists,
  setLoading,
  dispatch,
}) => {
  setLoading(true);
  try {
    const { data } = await axios.put(
      `${APP_URL}/api/playlists/${selectedPlaylist._id}/video/${selectedVideo._id}`,
      null
    );
    if (data.ok) {
      successToast("Video added to playlist");
      dispatch({
        type: "CREATE_PLAYLIST",
        payload: playlists.map((item) =>
          item._id === data.data._id ? data.data : item
        ),
      });
    }
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
    warningToast("Unable to add video to playlist");
  }
};

export const removeFromPlaylist = async ({
  selectedVideo,
  selectedPlaylist,
  playlists,
  setLoading,
  dispatch,
}) => {
  try {
    const { data } = await axios.delete(
      `${APP_URL}/api/playlists/${selectedPlaylist._id}/video/${selectedVideo._id}`
    );
    if (data.ok) {
      successToast("Video removed from playlist");
      dispatch({
        type: "CREATE_PLAYLIST",
        payload: playlists.map((item) =>
          item._id === data.data._id ? data.data : item
        ),
      });
    }
  } catch (error) {
    console.log(error);
    setLoading(false);
    warningToast("Unable to remove video from playlist");
  }
};

export const swapPlaylist = async ({
  selectedVideo,
  selectedPlaylist,
  playlists,
  setLoading,
  dispatch,
}) => {
  let currentPlaylist = null;
  try {
    playlists.forEach((playlist) => {
      if (playlist.videos.some((item) => item._id === selectedVideo._id))
        currentPlaylist = playlist._id;
    });
    const { data } = await axios.delete(
      `${APP_URL}/api/playlists/${currentPlaylist}/video/${selectedVideo._id}`
    );
    const { data: addVideo } = await axios.put(
      `${APP_URL}/api/playlists/${selectedPlaylist._id}/video/${selectedVideo._id}`,
      null
    );
    if (addVideo.ok) {
      successToast("Video added to playlist");
      dispatch({
        type: "CREATE_PLAYLIST",
        payload: playlists.map((item) => {
          if (item._id === data.data._id) return data.data;
          else if (item._id === addVideo.data._id) return addVideo.data;
          else return item;
        }),
      });
    }
  } catch (error) {
    console.log(error);
    setLoading(false);
    warningToast("Unable to swap playlist");
  }
};

export const addNewPlaylist = async ({
  newPlaylistName,
  setLoading,
  dispatch,
  playlists,
}) => {
  setLoading(true);
  try {
    const { data } = await axios.post(`${APP_URL}/api/playlists`, {
      name: newPlaylistName,
    });
    if (data.ok) {
      dispatch({
        type: "CREATE_PLAYLIST",
        payload: [...playlists, data.data],
      });
      successToast("Playlist added");
    }
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
    warningToast("Unable to add playlist");
  }
};

export const deletePlaylist = async ({
  playlistid,
  setLoading,
  dispatch,
  playlists,
}) => {
  setLoading(true);
  try {
    const { data } = await axios.delete(
      `${APP_URL}/api/playlists/${playlistid}`
    );
    if (data.ok) {
      successToast("Playlist has been deleted");
      dispatch({
        type: "CREATE_PLAYLIST",
        payload: playlists.filter(({ _id }) => _id !== playlistid),
      });
    }
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
    warningToast("Unable to delete playlist");
  }
};

export const addNotes = async ({ videoId, note, setLoading, dispatch }) => {
  setLoading(true);
  try {
    const { data } = await axios.post(`${APP_URL}/api/notes/${videoId}`, {
      note: note,
    });
    if (data.ok) {
      successToast("Note Added");
      selectVideo({
        videoId: videoId,
        dispatch: dispatch,
        setLoading: setLoading,
      });
    }
    setLoading(false);
  } catch (error) {
    console.log(error);
    warningToast("Unable to add note");
    setLoading(false);
  }
};

export const deleteNote = async ({ noteId, videoId, setLoading, dispatch }) => {
  setLoading(true);
  try {
    const { data } = await axios.delete(`${APP_URL}/api/notes/${noteId}`);
    if (data.ok) {
      successToast("Note deleted");
      selectVideo({
        videoId: videoId,
        dispatch: dispatch,
        setLoading: setLoading,
      });
    }
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
    warningToast("Unable to delete note");
  }
};

export const addToHistory = async ({ videoId, dispatch }) => {
  try {
    const { data } = await axios.put(
      `${APP_URL}/api/histories/${videoId}`,
      null
    );
    dispatch({
      type: "ADD_TO_HISTORY",
      payload: [...data.data],
    });
  } catch (error) {
    console.log(error);
    warningToast("Failed to add video to history");
  }
};

export const addLikeToVideo = async ({ videoId, setLoading, dispatch }) => {
  setLoading(true);
  try {
    const { data } = await axios.put(`${APP_URL}/api/likes/${videoId}`, null);
    if (data.ok) {
      selectVideo({
        videoId: videoId,
        dispatch: dispatch,
        setLoading: setLoading,
      });
      successToast("Video liked");
    }
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
    warningToast("Failed to add like to video");
  }
};

export const removeLikeFromVideo = async ({ like, setLoading, dispatch }) => {
  setLoading(true);
  try {
    const { data } = await axios.delete(`${APP_URL}/api/likes/${like._id}`);
    if (data.ok) {
      selectVideo({
        videoId: like.video,
        dispatch: dispatch,
        setLoading: setLoading,
      });
      successToast("Like removed");
    }
    setLoading(false);
  } catch (error) {
    console.log(error);
    warningToast("Failed to remove like from the video");
    setLoading(false);
  }
};

export const getFilteredData = ({ videoList, catagoryId }) => {
  if (catagoryId)
    return videoList.filter((item) => +item.catagoryId === +catagoryId);
  return [];
};

export const filterByCatagory = ({
  catagoryId,
  dispatch,
  fullVideoList,
  setLoading,
}) => {
  dispatch({
    type: "FILTER_VIDEO_BY_CATAGORY",
    payload: catagoryId,
  });

  fullVideoList.length > 0 &&
    selectVideo({
      videoId: fullVideoList.filter(
        (item) => +item.catagoryId === +catagoryId
      )[0]._id,
      dispatch: dispatch,
      setLoading: setLoading,
    });
};
