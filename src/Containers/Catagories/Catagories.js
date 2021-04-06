import classes from './Catagories.module.css';
import {useParams} from 'react-router-dom'
import {useContext,useEffect} from 'react'
import {CatagoriesContext} from '../../Store/Catagories-context-reducer'
import VideoNameList from '../VideoNameList/VideoNameList'
import Youtube from 'react-youtube'

const Catagories=()=>{
    const {id}=useParams()
    const {dispatch,selectedVideo}=useContext(CatagoriesContext);

    useEffect(()=>{
        dispatch({
            type:"FILTER_VIDEO_BY_CATAGORY",
            payload:id
        })
    },[id,dispatch])


    return(
        <div className={classes["catagory-container"]}>
            <div className={classes["catagory-video-name-list"]}>
                <VideoNameList/>
            </div>
            <div className={classes["catagory-video-play-area"]}>
                {selectedVideo&&<Youtube
                    videoId={selectedVideo.link}
                    className={classes["youtube-window"]}
                    onPause={event=>console.log(event.target.playerInfo.currentTime)}
                />}
            </div>
        </div>
    )

}

export default Catagories