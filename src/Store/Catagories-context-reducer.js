import {createContext, useReducer, useEffect} from 'react';
import axios from 'axios'

export const CatagoriesContext=createContext();

export const CatagoriesProvider=({children})=>{

    const catagoriesManipulation=(state,action)=>{
        switch (action.type) {
            case "ADD_VIDEOS_TO_LIST":
                return{
                    ...state,
                    fullVideoList:[...action.payload]
                }
            case "FILTER_VIDEO_BY_CATAGORY":
                return{
                    ...state,
                    currentCatagoryId:action.payload
                }
            case "SELECT_VIDEO":
                return{
                    ...state,
                    selectedVideo:{...action.payload}
                }
            default:
                return state;
        }
    }

    const [state,dispatch]=useReducer(catagoriesManipulation,{
        fullVideoList:[],
        videosByCatagory:[],
        currentCatagoryId:null,
        selectedVideo:null
    });

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
                type:"ADD_VIDEOS_TO_LIST",
                payload:[...data.fullVideosLists]
            })
        })()
    },[])

    return(
        <CatagoriesContext.Provider 
            value={{
                dispatch:dispatch,
                videosByCatagory:filteredData,
                selectedVideo:state.selectedVideo
            }}
        >
            {children}
        </CatagoriesContext.Provider>
    )
}