import {
  createContext,
  useState,
  useReducer,
  useEffect,
  useContext,
} from "react";
import {
  VideoReducer,
  loadPlaylist,
  loadHistory,
  loadVideos,
  selectVideo,
  addLikeToVideo,
  addNewPlaylist,
  addNotes,
  addToHistory,
  deleteNote,
  deletePlaylist,
  getFilteredData,
  removeLikeFromVideo,
  addVideoToPlaylist,
  removeFromPlaylist,
  swapPlaylist,
  filterByCatagory
} from "./VideoReducer";
import { useAuth } from "../";

export const VideoContext = createContext();

export const useVideo = () => useContext(VideoContext);

export const VideoContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    if (token)
      loadPlaylist({
        token: token,
        dispatch: dispatch,
        setLoading: setLoading,
      });
  }, [token]);

  useEffect(() => {
    if (token)
      loadHistory({
        token: token,
        dispatch: dispatch,
        setLoading: setLoading,
      });
  }, [token]);

  useEffect(() => {
    loadVideos({
      dispatch: dispatch,
      setLoading: setLoading,
    });
  }, []);

  const [state, dispatch] = useReducer(VideoReducer, {
    fullVideoList: [],
    currentCatagoryId: null,
    selectedVideo: null,
    playlists: [],
    history: [],
  });
  const filteredData = getFilteredData({
    videoList: state.fullVideoList,
    catagoryId: state.currentCatagoryId,
  });
  

  return (
    <VideoContext.Provider
      value={{
        videoDispatch: dispatch,
        videosByCatagory: filteredData,
        selectedVideo: state.selectedVideo,
        filterByCatagory: filterByCatagory,
        addVideoToPlaylist: addVideoToPlaylist,
        swapPlaylist: swapPlaylist,
        removeFromPlaylist: removeFromPlaylist,
        playlists: state.playlists,
        addNewPlaylist: addNewPlaylist,
        addToHistory: addToHistory,
        addLikeToVideo: addLikeToVideo,
        removeLikeFromVideo: removeLikeFromVideo,
        selectVideo: selectVideo,
        deletePlaylist: deletePlaylist,
        history: state.history,
        addNotes: addNotes,
        deleteNote: deleteNote,
        videoLoading: loading,
        setVideoLoading: setLoading,
        fullVideoList: state.fullVideoList,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
