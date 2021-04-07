import classes from './VideoPlayer.module.css'
import Youtube from 'react-youtube'
import {useContext,useState} from 'react'
import {CatagoriesContext} from '../../../Store/Catagories-context-reducer'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle,faCheck} from '@fortawesome/free-solid-svg-icons';

const VideoPlayer=()=>{
    const [openPlaylist,setOpenPlaylist]=useState(false)
    const [newPlaylistName,setNewPlaylistName]=useState("")

    const {selectedVideo,addVideoToPlaylist,playlists,addNewPlaylist:addNewPlaylistAction}=useContext(CatagoriesContext)

    

    const addNewPlaylist=async()=>{
        if(newPlaylistName.length>0){
            addNewPlaylistAction(newPlaylistName)
            setNewPlaylistName("")
        }else{
            alert("Please Enter a Name")
        }
    }

    return(
        <div className={classes["video-player"]}>
            <h1 className={classes["video-name"]}>
                {selectedVideo.name}
            </h1>
            <Youtube
                videoId={selectedVideo.link}
                className={classes["youtube-window"]}
                onPause={event=>console.log(event.target.playerInfo.currentTime)}
            />
            <div className={classes["options-bar"]}>
                <h2>
                    Author: {selectedVideo.author}
                </h2>
                <div className={classes["watchlist-dropdown-container"]}>
                    <button 
                        className={`${classes["button-outline"]} ${classes["button-primary"]}`}
                        onClick={()=>{
                            setOpenPlaylist(status=>!status)
                        }}
                        >
                        Add To Playlist
                    </button>
                    {openPlaylist&&<ul className={classes["watchlist-dropdown"]}>
                        {
                            playlists.map((item)=>(
                                <li key={item.id}
                                    onClick={()=>{
                                        addVideoToPlaylist(selectedVideo,item)
                                        setOpenPlaylist(status=>!status)
                                    }}
                                    className={item.id===selectedVideo.playlist?classes["video-active"]:null}
                                >
                                    <p>
                                        {item.name}
                                    </p>
                                    {item.id===selectedVideo.playlist&&<FontAwesomeIcon icon={faCheck}/>}
                                </li>
                            ))
                        }
                        <li>
                            <form className={classes["add-new-playlist"]} onSubmit={(event)=>{
                                    event.preventDefault()
                                    addNewPlaylist(newPlaylistName)
                                }}>
                                <input type="text" 
                                    className={classes["textbox"]} 
                                    placeholder="Add New Playlist"
                                    value={newPlaylistName}
                                    onChange={event=>setNewPlaylistName(event.target.value)}
                                />
                                <button
                                    type="submit"
                                >
                                    <FontAwesomeIcon
                                        icon={faPlusCircle}
                                    />
                                </button>
                            </form>
                        </li>
                    </ul>}
                </div>
            </div>
            <div className={classes["description"]}>
                <h3>
                    Description:
                </h3>
                <p>
                    {selectedVideo.description}
                </p>
            </div>
        </div>
    )
}

export default VideoPlayer