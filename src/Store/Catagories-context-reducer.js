import {createContext, useReducer, useEffect} from 'react';
import axios from 'axios'

export const CatagoriesContext=createContext();

export const CatagoriesProvider=({children})=>{

    const catagoriesManipulation=(state,action)=>{
        switch (action.type) {
            case "ADD_VIDEOS_TO_LIST":
                return{
                    ...state,
                    videoList:[...action.payload]
                }
            default:
                return state;
        }
    }

    const [state,dispatch]=useReducer(catagoriesManipulation,{
        videoList:[],
        catagoryurl:null
    });

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
                videoList:state.videoList,
                dispatch:dispatch
            }}
        >
            {children}
        </CatagoriesContext.Provider>
    )
}