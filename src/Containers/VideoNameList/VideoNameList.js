import classes from './VideoNameList.module.css'
import {useCatagory} from '../../Store/CatagoriesReducer'

const VideoNameList=({closeDropDown})=>{
    const {videosByCatagory,selectedVideo,selectVideo}=useCatagory()
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