import {createContext, useReducer, useEffect,useContext, useState} from 'react';
import {useAuth} from './AuthReducer'
import axios from '../useAxios'
import { successToast, warningToast } from '../UI/Toast/Toast';

export const CatagoriesContext=createContext();

export const useCatagory=()=>useContext(CatagoriesContext)

export const CatagoriesProvider=({children})=>{

    const {userId,token} =useAuth()
    const [loading,setLoading]=useState(false)

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
            case "FILTER_VIDEO_BY_CATAGORY":
                return{
                    ...state,
                    currentCatagoryId:action.payload,
                    selectedVideo:null
                }
            case "SELECT_VIDEO":
                return{
                    ...state,
                    selectedVideo:{...action.payload}
                }
            case "ADD_TO_HISTORY":
                return{
                    ...state,
                    history:[...action.payload]
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

    const selectVideo=async (videoid)=>{
        setLoading(true)
        try{
            const {data}=await axios.get(`/api/videos/${videoid}`,config)
            if(data.ok){
                dispatch({
                    type:"SELECT_VIDEO",
                    payload:data.data
                })
            }
            setLoading(false)
        }catch(error){
            console.log(error)
            setLoading(false)
            warningToast("Failed to load video")
        }
    }

    const addVideoToPlaylist=async(selectedVideo,playlist)=>{
        let currentPlaylist=null;
        state.playlists.forEach(playlist=>{
            if(playlist.videos.some(item=>item._id===selectedVideo._id))
                currentPlaylist=playlist._id;
        })
        setLoading(true)
        try{
            if(!currentPlaylist){
                const {data}=await axios.put(`/api/playlists/${playlist._id}/video/${selectedVideo._id}`,null,config)
                if(data.ok){
                    successToast("Video added to playlist")
                    dispatch({
                        type:"CREATE_PLAYLIST",
                        payload:state.playlists.map(item=>item._id===data.data._id?data.data:item)
                    })
                }
            }else if(currentPlaylist===playlist._id){
                const {data}=await axios.delete(`/api/playlists/${playlist._id}/video/${selectedVideo._id}`,config)
                if(data.ok){
                    successToast("Video removed from playlist")
                    dispatch({
                        type:"CREATE_PLAYLIST",
                        payload:state.playlists.map(item=>item._id===data.data._id?data.data:item)
                    })
                }
            }else if(currentPlaylist!==playlist.id){
                const {data}=await axios.delete(`/api/playlists/${currentPlaylist}/video/${selectedVideo._id}`,config)
                
                const {data:addVideo}=await axios.put(`/api/playlists/${playlist._id}/video/${selectedVideo._id}`,null,config)
                    if(addVideo.ok){
                        successToast("Video added to playlist")
                        dispatch({
                            type:"CREATE_PLAYLIST",
                            payload:state.playlists.map(item=>{
                                if(item._id===data.data._id)
                                    return data.data;
                                else if(item._id===addVideo.data._id)
                                    return addVideo.data
                                else
                                    return item
                            })
                        })
                    }
                }
                setLoading(false)
        }catch(error){
            console.log(error)
            setLoading(false)
            warningToast("Unable to add video to playlist")
        }
    }

    const addNewPlaylist=async (newPlaylistName)=>{
        setLoading(true)
        try{
            const {data}=await axios.post(`/api/playlists/${userId}`,{
                name:newPlaylistName
            },config)
            if(data.ok){
                dispatch({
                    type:"CREATE_PLAYLIST",
                    payload:[...state.playlists,data.data]
                })
                successToast("Playlist added")
            }
            setLoading(false)            
        }catch(error){
            console.log(error)
            setLoading(false)
            warningToast("Unable to add playlist")
        }
    }

    const deletePlaylist=async (playlistid)=>{
        setLoading(true)
        try{
            const {data}=await axios.delete(`/api/playlists/${playlistid}/users/${userId}`,config)
            if(data.ok){
                successToast("Playlist has been deleted")
                dispatch({
                    type:"CREATE_PLAYLIST",
                    payload:[...data.data]
                })
            }
            setLoading(false)
        }catch(error){
            console.log(error)
            setLoading(false)
            warningToast("Unable to delete playlist")
        }
    }

    const addNotes=async (videoId,note)=>{
        setLoading(true)
        try{
            const {data}=await axios.post(`/api/notes/${videoId}/users/${userId}`,{
                note:note
            },config)
            if(data.ok){
                successToast("Note Added")
                selectVideo(videoId)
            }
            setLoading(false)
        }catch(error){
            console.log(error)
            warningToast("Unable to add note")
            setLoading(false)
        }
    }

    const deleteNote=async (noteId,videoId)=>{
        setLoading(true)
        try{
            const {data}=await axios.delete(`/api/notes/${noteId}`,config)
            if(data.ok){
                successToast("Note deleted")
                selectVideo(videoId)
            }
            setLoading(false)
        }catch(error){
            console.log(error)
            setLoading(false)
            warningToast("Unable to delete note")
        }
    }

    const addToHistory=async (videoId)=>{
        if(state.selectedVideo && token){
            try{
                const {data}=await axios.put(`/api/histories/${videoId}/users/${userId}`,null,config)
                dispatch({
                    type:"ADD_TO_HISTORY",
                    payload:[...data.data]
                })
            }catch(error){
                console.log(error)
                warningToast("Failed to add video to history")
            }
        }
    }

    const addLikeToVideo=async (videoId)=>{
        setLoading(true)
        try{
            const {data}=await axios.put(`/api/likes/${videoId}/users/${userId}`,null,config)
            if(data.ok){
                selectVideo(videoId)
                successToast("Video liked")
            }
            setLoading(false)
        }catch(error){
            console.log(error)
            setLoading(false)
            warningToast("Failed to add like to video")
        }
    }

    const removeLikeFromVideo=async (like)=>{
        setLoading(true)
        try{
            const {data}=await axios.delete(`/api/likes/${like._id}`,config)
            if(data.ok){
                selectVideo(like.video)
                successToast("Like removed")
            }
            setLoading(false)
        }catch(error){
            console.log(error)
            warningToast("Failed to remove like from the video")
            setLoading(false)
        }
    }
    
    const filterByCatagory=(catagoryId)=>{
        dispatch({
            type:"FILTER_VIDEO_BY_CATAGORY",
            payload:catagoryId
        })
        state.fullVideoList.length>0&&selectVideo(state.fullVideoList.filter(item=>+item.catagoryId===+catagoryId)[0]._id)
    }

    const getFilteredData=(videoList,id)=>{
        if(id)
            return videoList.filter(item=>+item.catagoryId===+id)
        return []
    }

    const filteredData=getFilteredData(state.fullVideoList,state.currentCatagoryId)

    useEffect(()=>{
        (async()=>{
            try{
                if(token&&userId){
                    const {data}=await axios.get(`/api/histories/${userId}`,config)
                    dispatch({
                        type:"ADD_TO_HISTORY",
                        payload:[...data.data]
                    })
                }
            }catch(error){
                warningToast("Unable to load history")
                console.log(error)
            }
        })()
    },[userId,token])

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
                warningToast("Unable to load videos")
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
                filterByCatagory:filterByCatagory,
                addVideoToPlaylist:addVideoToPlaylist,
                playlists:state.playlists,
                addNewPlaylist:addNewPlaylist,
                addToHistory:addToHistory,
                addLikeToVideo:addLikeToVideo,
                removeLikeFromVideo:removeLikeFromVideo,
                selectVideo:selectVideo,
                deletePlaylist:deletePlaylist,
                history:state.history,
                addNotes:addNotes,
                deleteNote:deleteNote,
                catagoriesLoading:loading
            }}
        >
            {children}
        </CatagoriesContext.Provider>
    )
}