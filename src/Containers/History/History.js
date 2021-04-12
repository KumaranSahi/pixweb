import classes from './History.module.css'
import {useContext} from 'react'
import {CatagoriesContext} from '../../Store/CatagoriesReducer'
import {useHistory} from 'react-router-dom'

const History=()=>{
    const {push}=useHistory();
    const {dispatch,history}=useContext(CatagoriesContext)

    return(<div className={classes["history-container"]}>
        <h1>
            History:
        </h1>
        <ul className={classes["history-videolist"]}>
            {
                history.map(video=>(
                    <li key={video.id} className={classes["videolist-item"]}>
                        <img
                            src={`https://img.youtube.com/vi/${video.link}/0.jpg`}
                            alt="thumbnail"
                            onClick={()=>{
                                dispatch({
                                    type:"SELECT_VIDEO",
                                    payload:{...video}
                                })
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