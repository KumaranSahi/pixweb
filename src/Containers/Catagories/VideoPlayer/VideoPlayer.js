import classes from './VideoPlayer.module.css'
import Youtube from 'react-youtube'
import {useContext,useState} from 'react'
import {CatagoriesContext} from '../../../Store/Catagories-context-reducer'
import axios from 'axios';
import { useEffect } from 'react/cjs/react.development';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';

const VideoPlayer=()=>{
    const [openPlaylist,setOpenPlaylist]=useState(false)
    const [playlist,setPlaylist]=useState([])
    const [newPlaylistName,setNewPlaylistName]=useState("")
    const [newPlaylistAdded,setNewPlaylistAdded]=useState(false)
    const {selectedVideo}=useContext(CatagoriesContext)

    useEffect(()=>{
        (
            async()=>{
                const {data}=await axios.get("/api/load-all-playlists")
                setPlaylist([...data.playLists])
            }
        )()
    },[newPlaylistAdded])

    const addNewPlaylist=async()=>{
        if(newPlaylistName.length>0){
            const data=await axios.post("/api/add-new-playlist",{
                name:newPlaylistName
            })
            if(+data.status===201){
                setNewPlaylistAdded(status=>!status)
            }
            setNewPlaylistName("")
        }else{
            alert("Please Enter a Name")
        }
    }

    const addVideoToPlaylist=async(video)=>{
        
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
                            playlist.map((item)=>(
                                <li key={item.id}
                                    onClick={()=>addVideoToPlaylist(item)}
                                >
                                    <p>
                                        {item.name}
                                    </p>
                                </li>
                            ))
                        }
                        <li>
                            <div className={classes["add-new-playlist"]}>
                                <input type="text" 
                                    className={classes["textbox"]} 
                                    placeholder="Add New Playlist"
                                    value={newPlaylistName}
                                    onChange={event=>setNewPlaylistName(event.target.value)}
                                />
                                <FontAwesomeIcon
                                    icon={faPlusCircle}
                                    onClick={addNewPlaylist}
                                />
                            </div>
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