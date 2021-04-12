import classes from './VideoNameList.module.css'
import {CatagoriesContext} from '../../Store/CatagoriesReducer'
import { useContext } from 'react'

const VideoNameList=({closeDropDown})=>{
    const {videosByCatagory,dispatch,selectedVideo}=useContext(CatagoriesContext)
    return(
        <ul className={classes["video-name-list"]}>
            {
                videosByCatagory&&videosByCatagory.map((item)=>(
                    <li key={item.id}
                        onClick={()=>{dispatch({
                            type:"SELECT_VIDEO",
                            payload:{...item}
                        })
                        closeDropDown&&closeDropDown()
                        }}
                        className={selectedVideo&&selectedVideo.id===item.id?classes["video-active"]:null}
                    >
                        <p>
                        {item.name}
                        </p>
                    </li>
                ))
            }
        </ul>
    )
}

export default VideoNameList