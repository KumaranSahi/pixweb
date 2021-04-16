import {createContext, useReducer, useEffect,useContext} from 'react';
import {AuthContext} from './AuthReducer'
import axios from 'axios'
import { warningToast } from '../UI/Toast/Toast';

export const CatagoriesContext=createContext();

export const CatagoriesProvider=({children})=>{

    const {userId,token} =useContext(AuthContext)

    const config = {
        headers: {
            Authorization: "Bearer " + token
        }
    }

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
                    selectedVideo:state.fullVideoList.filter(({catagoryId})=>+catagoryId===+action.payload)[0]
                }
            case "SELECT_VIDEO":
                return{
                    ...state,
                    selectedVideo:{...action.payload}
                }
            case "VIDEO_ADDED_TO_PLAYLIST":
                return{
                    ...state,
                    playlists:[...action.payload.playlist],
                    selectedVideo:{...state.selectedVideo,playlist:action.payload.playlistid},
                    fullVideoList:[...action.payload.fullVideosList],
                    history:[...action.payload.history]
                }
            case "VIDEO_REMOVED_FROM_PLAYLIST":
                return{
                    ...state,
                    selectedVideo:{...state.selectedVideo,playlist:null},
                    playlists:[...action.payload.playlist],
                    fullVideoList:[...action.payload.fullVideosList],
                    history:[...action.payload.history]
                }
            case "DELETE_PLAYLIST":
                return{
                    ...state,
                    playlists:[...action.payload.playlist],
                    fullVideoList:[...action.payload.fullVideosList],
                    history:[...action.payload.history]
                }
            case "ADD_TO_HISTORY":
                return{
                    ...state,
                    history:[...action.payload]
                }
            case "ADD_NOTES_TO_VIDEO":
                return{
                    ...state,
                    playlists:[...action.payload.playlist],
                    fullVideoList:[...action.payload.fullVideosList],
                    history:[...action.payload.history],
                    selectedVideo:{...state.selectedVideo,notes:[...state.selectedVideo.notes,action.payload.note]}
                }
            default:
                return state;
        }
    }

    const [state,dispatch]=useReducer(catagoriesManipulation,{
        fullVideoList:[],
        currentCatagoryId:null,
        selectedVideo:null,
        playlists:[],
        history:[]
    });

    const addVideoToPlaylist=async(selectedVideo,playlist)=>{
        if(!selectedVideo.playlist||(selectedVideo.playlist&&selectedVideo.playlist!==playlist.id)){
            const {data,status}=await axios.post("/api/add-video-to-playlist",{
                video:selectedVideo,
                playlistid:playlist.id
            })
            if(+status===201){
                dispatch({
                    type:"VIDEO_ADDED_TO_PLAYLIST",
                    payload:{
                        playlist:[...data.playlist.models],
                        fullVideosList:[...data.fullVideosList.models],
                        playlistid:playlist.id,
                        history:[...data.history.models]
                    }
                })
            }
        }else if(selectedVideo.playlist&&selectedVideo.playlist===playlist.id){
            const {data,status}=await axios.post("/api/remove-video-from-playlist",{
                video:selectedVideo,
                playlistid:playlist.id
            })
            if(+status===201){
                console.log(data)
                dispatch({
                    type:"VIDEO_REMOVED_FROM_PLAYLIST",
                    payload:{
                        playlist:[...data.playlist.models],
                        fullVideosList:[...data.fullVideosList.models],
                        playlistid:playlist.id,
                        history:[...data.history.models]
                    }
                })
            }
        }
    }

    const addNewPlaylist=async (newPlaylistName)=>{
        const {data,status}=await axios.post("/api/add-new-playlist",{
            name:newPlaylistName
        })
        if(+status===201){
            dispatch({
                type:"ADD_NEWPLAYLIST",
                payload:data.playList
            })
        }
    }

    const deletePlaylist=async (playlistid)=>{
        const {status,data}=await axios.delete("/api/delete-playlist",{params:playlistid})
        if(+status===200){
            dispatch({
                type:"DELETE_PLAYLIST",
                payload:{
                    playlist:[...data.playlist.models],
                    fullVideosList:[...data.fullVideosList.models],
                    history:[...data.history.models]
                }
            })
        }
    }

    const addNotes=async (videoId,note)=>{
        const {status,data}=await axios.post("/api/add-note-to-video",{
            videoId,note
        })
        if(+status===201){
            dispatch({
                type:"ADD_NOTES_TO_VIDEO",
                payload:{
                    playlist:[...data.playlist.models],
                    fullVideosList:[...data.fullVideosList.models],
                    history:[...data.history.models],
                    note:note
                }
            })
        }
    }

    

    const getFilteredData=(videoList,id)=>{
        if(id)
            return videoList.filter(item=>+item.catagoryId===+id)
        return []
    }

    const filteredData=getFilteredData(state.fullVideoList,state.currentCatagoryId)

    const addToHistory=async (videoId)=>{
        console.log(videoId,userId)
        if(state.selectedVideo){
            try{
                const {data}=await axios.put(`/api/histories/${videoId}/users/${userId}`,null,config)
                console.log(data)
            }catch(error){
                console.log(error)
                warningToast("Unable to add video to history")
            }
        }
    }

    // useEffect(()=>{
    //     (async()=>{
    //         if(state.selectedVideo){
    //             const {data,status}=await axios.post("/api/add-video-to-history",{
    //                 newVideo:state.selectedVideo
    //             })
    //             if(+status===201){
    //                 dispatch({
    //                     type:"ADD_TO_HISTORY",
    //                     payload:[...data.histories]
    //                 })
    //             }
    //         }
    //     })()
    // },[state.selectedVideo])

    useEffect(()=>{
        (async()=>{
            try{
            const {data}=await axios.get("/api/videos")
            if(data.ok){
                dispatch({
                    type:"CREATE_VIDEOLIST",
                    payload:[...data.data]
                })
            }
            }catch(error){
                console.log(error)
            }
        })()
    },[])

    useEffect(()=>{
        (
            async()=>{
                try{
                if(token&&userId){
                    const {data:{data}}=await axios.get(`/api/playlists/${userId}`,config)
                    dispatch({
                        type:"CREATE_PLAYLIST",
                        payload:[...data]
                    })
                }
                }catch(error){
                    warningToast("Unable to load playlists")
                }
            }
        )()
    },[userId,token])

    return(
        <CatagoriesContext.Provider 
            value={{
                dispatch:dispatch,
                videosByCatagory:filteredData,
                selectedVideo:state.selectedVideo,
                addVideoToPlaylist:addVideoToPlaylist,
                playlists:state.playlists,
                addNewPlaylist:addNewPlaylist,
                addToHistory:addToHistory,
                deletePlaylist:deletePlaylist,
                history:state.history,
                addNotes:addNotes
            }}
        >
            {children}
        </CatagoriesContext.Provider>
    )
}