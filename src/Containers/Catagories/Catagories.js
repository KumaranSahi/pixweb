import classes from './Catagories.module.css';
import {useParams} from 'react-router-dom'
import {useEffect} from 'react'
import {useAuth, useVideo} from '../../Store'
import VideoNameList from '../VideoNameList/VideoNameList'
import VideoPlayer from './VideoPlayer/VideoPlayer'

const Catagories=()=>{
    const {id}=useParams()
    const {
      selectedVideo,
      filterByCatagory,
      setVideoLoading,
      videoDispatch,
      fullVideoList,
    } = useVideo();
    const {token}=useAuth()

    useEffect(()=>{
          filterByCatagory({
            catagoryId: id,
            dispatch: videoDispatch,
            fullVideoList: fullVideoList,
            setLoading: setVideoLoading,
            token: token,
          });
    },[id])

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