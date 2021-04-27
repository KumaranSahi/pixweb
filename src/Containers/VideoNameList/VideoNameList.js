import classes from './VideoNameList.module.css'
import {CatagoriesContext} from '../../Store/CatagoriesReducer'
import { useContext } from 'react'

const VideoNameList=({closeDropDown})=>{
    const {videosByCatagory,selectedVideo,selectVideo}=useContext(CatagoriesContext)
    return(
        <ul className={classes["video-name-list"]}>
            {
                videosByCatagory&&videosByCatagory.map((item)=>(
                    <li key={item._id}
                        onClick={()=>{selectVideo(item._id)
                        closeDropDown&&closeDropDown()
                        }}
                        className={selectedVideo&&selectedVideo._id===item._id?classes["video-active"]:null}
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