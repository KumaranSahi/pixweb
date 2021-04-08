import classes from './PlaylistPage.module.css';
import {useContext} from 'react'
import {CatagoriesContext} from '../../Store/Catagories-context-reducer'
import PlaylistList from './PlaylistList/PlaylistList';

const PlaylistPage=()=>{
    const {playlists}=useContext(CatagoriesContext);
    return(
        <div className={classes["playlist-container"]}>
            <h1>
                Playlists:
            </h1>
            <ul className={classes["list-of-playlists"]}>
                {
                    playlists.map(({id,name,videos})=>(
                        <li key={id}>
                            <PlaylistList
                                id={id}
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