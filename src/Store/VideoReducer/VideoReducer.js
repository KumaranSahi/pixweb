import axios from "../../useAxios";
import { successToast, warningToast } from "../../UI/Toast/Toast";

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

export const loadPlaylist = async ({ token, dispatch, setLoading }) => {
  setLoading(true);
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const {
      data: { data },
    } = await axios.get(`/api/playlists`, config);
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

export const loadHistory = async ({ dispatch, token, setLoading }) => {
  setLoading(true);
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const { data } = await axios.get(`/api/histories`, config);
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
    const { data } = await axios.get("/api/videos");
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

export const selectVideo = async ({ videoId, dispatch, setLoading, token }) => {
  setLoading(true);
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const { data } = await axios.get(`/api/videos/${videoId}`, config);
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
  token,
  playlists,
  setLoading,
  dispatch,
}) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  setLoading(true);
  try {
    const { data } = await axios.put(
      `/api/playlists/${selectedPlaylist._id}/video/${selectedVideo._id}`,
      null,
      config
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
  token,
  playlists,
  setLoading,
  dispatch,
}) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const { data } = await axios.delete(
      `/api/playlists/${selectedPlaylist._id}/video/${selectedVideo._id}`,
      config
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
  token,
  playlists,
  setLoading,
  dispatch,
}) => {
  let currentPlaylist = null;
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    playlists.forEach((playlist) => {
      if (playlist.videos.some((item) => item._id === selectedVideo._id))
        currentPlaylist = playlist._id;
    });
    const { data } = await axios.delete(
      `/api/playlists/${currentPlaylist}/video/${selectedVideo._id}`,
      config
    );
    const { data: addVideo } = await axios.put(
      `/api/playlists/${selectedPlaylist._id}/video/${selectedVideo._id}`,
      null,
      config
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
  token,
  dispatch,
  playlists,
}) => {
  setLoading(true);
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const { data } = await axios.post(
      `/api/playlists`,
      {
        name: newPlaylistName,
      },
      config
    );
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
  token,
  dispatch,
  playlists,
}) => {
  setLoading(true);
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const { data } = await axios.delete(`/api/playlists/${playlistid}`, config);
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

export const addNotes = async ({
  videoId,
  note,
  setLoading,
  token,
  dispatch,
}) => {
  setLoading(true);
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const { data } = await axios.post(
      `/api/notes/${videoId}`,
      {
        note: note,
      },
      config
    );
    if (data.ok) {
      successToast("Note Added");
      selectVideo({
        videoId: videoId,
        dispatch: dispatch,
        setLoading: setLoading,
        token: token,
      });
    }
    setLoading(false);
  } catch (error) {
    console.log(error);
    warningToast("Unable to add note");
    setLoading(false);
  }
};

export const deleteNote = async ({
  noteId,
  videoId,
  setLoading,
  token,
  dispatch,
}) => {
  setLoading(true);
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const { data } = await axios.delete(`/api/notes/${noteId}`, config);
    if (data.ok) {
      successToast("Note deleted");
      selectVideo({
        videoId: videoId,
        dispatch: dispatch,
        setLoading: setLoading,
        token: token,
      });
    }
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
    warningToast("Unable to delete note");
  }
};

export const addToHistory = async ({ videoId, token, dispatch }) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const { data } = await axios.put(`/api/histories/${videoId}`, null, config);
    dispatch({
      type: "ADD_TO_HISTORY",
      payload: [...data.data],
    });
  } catch (error) {
    console.log(error);
    warningToast("Failed to add video to history");
  }
};

export const addLikeToVideo = async ({
  videoId,
  setLoading,
  token,
  dispatch,
}) => {
  setLoading(true);
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const { data } = await axios.put(`/api/likes/${videoId}`, null, config);
    if (data.ok) {
      selectVideo({
        videoId: videoId,
        dispatch: dispatch,
        setLoading: setLoading,
        token: token,
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

export const removeLikeFromVideo = async ({ like, setLoading, token, dispatch }) => {
  setLoading(true);
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const { data } = await axios.delete(`/api/likes/${like._id}`, config);
    if (data.ok) {
      selectVideo({
        videoId: like.video,
        dispatch: dispatch,
        setLoading: setLoading,
        token: token,
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
  token,
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
      token: token,
    });
};
