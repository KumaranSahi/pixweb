import classes from './Catagories.module.css';
import {useParams} from 'react-router-dom'
import {useContext,useEffect} from 'react'
import {CatagoriesContext} from '../../Store/CatagoriesReducer'
import VideoNameList from '../VideoNameList/VideoNameList'
import VideoPlayer from './VideoPlayer/VideoPlayer'

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
            <div className={classes["catagory-video-play-area"]}>
                {selectedVideo?<VideoPlayer/>:
                <h1 className={classes["start-learning-message"]}>
                    Start Learning!    
                </h1>}
            </div>
            <div className={classes["catagory-video-name-list"]}>
                <VideoNameList/>
            </div>
            
        </div>
    )

}

export default Catagories