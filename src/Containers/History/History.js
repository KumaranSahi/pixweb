import classes from './History.module.css'
import {useCatagory} from '../../Store/CatagoriesReducer'
import {useHistory} from 'react-router-dom'

const History=()=>{
    const {push}=useHistory();
    const {history,selectVideo}=useCatagory()

    return(<div className={classes["history-container"]}>
        <h1>
            History:
        </h1>
        <ul className={classes["history-videolist"]}>
            {
                history.map(video=>(
                    <li key={video._id} className={classes["videolist-item"]}>
                        <img
                            src={`https://img.youtube.com/vi/${video.link}/0.jpg`}
                            alt="thumbnail"
                            onClick={()=>{
                                selectVideo(video._id)
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
    </div>)
}

export default History;