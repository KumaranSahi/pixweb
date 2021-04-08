import {createContext, useReducer, useEffect} from 'react';
import axios from 'axios'

export const CatagoriesContext=createContext();

export const CatagoriesProvider=({children})=>{

    const catagoriesManipulation=(state,action)=>{
        switch (action.type) {
            case "CREATE_VIDEOLIST":
                return{
                    ...state,
                    fullVideoList:[...action.payload]
                }
            case "CREATE_PLAYLIST":
                return{
                    ...state,
                    playlists:[...action.payload]
                }
            case "ADD_NEWPLAYLIST":    
            return{
                    ...state,
                    playlists:[...state.playlists,action.payload]
                }
            case "FILTER_VIDEO_BY_CATAGORY":
                return{
                    ...state,
                    currentCatagoryId:action.payload,
                    selectedVideo:state.fullVideoList.filter(({catagoryId})=>catagoryId===action.payload)[0]
                }
            case "SELECT_VIDEO":
                return{
                    ...state,
                    selectedVideo:{...action.payload}
                }
            case "VIDEO_ADDED_TO_PLAYLIST":
                return{
                    ...state,
                    playlists:state.playlists.map(item=>item.id===action.payload.playlist.id?{...item,videos:[...item.videos,action.payload.video]}:{...item,videos:item.videos.filter(video=>video.id!==action.payload.video.id)}),
                    selectedVideo:{...state.selectedVideo,playlist:action.payload.playlist.id},
                    fullVideoList:state.fullVideoList.map(item=>item.id===action.payload.video.id?{...item,playlist:action.payload.playlist.id}:item),
                }
            case "VIDEO_REMOVED_FROM_PLAYLIST":
                return{
                    ...state,
                    playlists:state.playlists.map(item=>action.payload.playlist.id?{...item,videos:item.videos.filter(video=>video.id!==action.payload.video.id)}:item),
                    selectedVideo:{...state.selectedVideo,playlist:null},
                    fullVideoList:state.fullVideoList.map(item=>item.id===action.payload.video.id?{...item,playlist:null}:item),
                }
            case "DELETE_PLAYLIST":
                return{
                    ...state,
                    fullVideoList:state.fullVideoList.map(item=>item.playlist===action.payload?{...item,playlist:null}:item),
                    playlists:state.playlists.filter(({id})=>id!==action.payload)
                }
            default:
                return state;
        }
    }

    const [state,dispatch]=useReducer(catagoriesManipulation,{
        fullVideoList:[],
        videosByCatagory:[],
        currentCatagoryId:null,
        selectedVideo:null,
        playlists:[]
    });

    const addVideoToPlaylist=async(selectedVideo,playlist)=>{
        if(!selectedVideo.playlist||(selectedVideo.playlist&&selectedVideo.playlist!==playlist.id)){
            const data=await axios.post("/api/add-video-to-playlist",{
                video:selectedVideo,
                playlistid:playlist.id
            })
            if(+data.status===201){
                dispatch({
                    type:"VIDEO_ADDED_TO_PLAYLIST",
                    payload:{
                        playlist:playlist,
                        video:selectedVideo
                    }
                })
            }
        }else if(selectedVideo.playlist&&selectedVideo.playlist===playlist.id){
            const data=await axios.post("/api/remove-video-from-playlist",{
                video:selectedVideo,
                playlistid:playlist.id
            })
            if(+data.status===201){
                dispatch({
                    type:"VIDEO_REMOVED_FROM_PLAYLIST",
                    payload:{
                        playlist:playlist,
                        video:selectedVideo
                    }
                })
            }
        }
    }

    const addNewPlaylist=async (newPlayListName)=>{
        const {data,status}=await axios.post("/api/add-new-playlist",{
            name:newPlayListName
        })
        if(+status===201){
            dispatch({
                type:"ADD_NEWPLAYLIST",
                payload:data.playList
            })
        }
    }

    const deletePlaylist=async (playlistid)=>{
        const {status}=await axios.delete("/api/delete-playlist",{params:playlistid})
        if(+status===200){
            dispatch({
                type:"DELETE_PLAYLIST",
                payload:playlistid
            })
        }
    }

    const getFilteredData=(videoList,id)=>{
        if(id)
            return videoList.filter(item=>item.catagoryId===id)
        return []
    }

    const filteredData=getFilteredData(state.fullVideoList,state.currentCatagoryId)

    useEffect(()=>{
        (async()=>{
            const {data}=await axios.get("/api/load-all-videos")
            dispatch({
                type:"CREATE_VIDEOLIST",
                payload:[...data.fullVideosLists]
            })
        })()
    },[])

    useEffect(()=>{
        (
            async()=>{
                const {data}=await axios.get("/api/load-all-playlists")
                dispatch({
                    type:"CREATE_PLAYLIST",
                    payload:[...data.playLists]
                })
            }
        )()
    },[])

    return(
        <CatagoriesContext.Provider 
            value={{
                dispatch:dispatch,
                videosByCatagory:filteredData,
                selectedVideo:state.selectedVideo,
                addVideoToPlaylist:addVideoToPlaylist,
                playlists:state.playlists,
                addNewPlaylist:addNewPlaylist,
                deletePlaylist:deletePlaylist
            }}
        >
            {children}
        </CatagoriesContext.Provider>
    )
}