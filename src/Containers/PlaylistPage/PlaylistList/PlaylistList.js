import classes from './PlaylistList.module.css'
import {useHistory} from 'react-router-dom'
import {CatagoriesContext} from '../../../Store/CatagoriesReducer'
import {useContext} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

const PlaylistList=({name,videos,id})=>{
    const {push}=useHistory();
    const {deletePlaylist,selectVideo}=useContext(CatagoriesContext)
    
    return(
        <div className={classes["playlist-list"]}>
            <h2>
                {name}
                <FontAwesomeIcon
                    icon={faTrash}
                    className={classes["delete-playlist"]}
                    onClick={()=>deletePlaylist(id)}
                />
            </h2>
            <ul className={classes["playlist-videolist"]}>
                {
                    videos.map(video=>(
                        <li key={video._id} className={classes["videolist-item"]}>
                            <img
                                src={`https://img.youtube.com/vi/${video.link}/0.jpg`}
                                alt="thumbnail"
                                onClick={()=>{selectVideo(video._id)
                                    push("/video-player")
                                }}
                            />
                            <h3>
                                {video.name}
                            </h3>
                            <p>
                                {video.author}
                            </p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default PlaylistList