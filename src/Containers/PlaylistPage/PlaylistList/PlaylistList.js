import classes from './PlaylistList.module.css'
import {Link} from 'react-router-dom'

const PlaylistList=({name,videos})=>{
    return(
        <div className={classes["playlist-list"]}>
            <h2>
                {name}
            </h2>
            <ul className={classes["playlist-videolist"]}>
                {
                    videos.map(({id,name,link,author})=>(
                        <li key={id} className={classes["videolist-item"]}>
                            <Link to="/video-player">
                                <img
                                    src={`https://img.youtube.com/vi/${link}/0.jpg`}
                                    alt="thumbnail"
                                />
                                <h3>
                                    {name}
                                </h3>
                                <p>
                                    {author}
                                </p>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default PlaylistList