import classes from './PlaylistPage.module.css';
import {useCatagory} from '../../Store/CatagoriesReducer'
import PlaylistList from './PlaylistList/PlaylistList';

const PlaylistPage=()=>{
    const {playlists}=useCatagory();
    return(
        <div className={classes["playlist-container"]}>
            <h1>
                Playlists:
            </h1>
            <ul className={classes["list-of-playlists"]}>
                {
                    playlists.map(({_id,name,videos})=>(
                        <li key={_id}>
                            <PlaylistList
                                id={_id}
                                name={name}
                                videos={videos}
                            />
                            {videos.length>0&&<hr/>}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default PlaylistPage;