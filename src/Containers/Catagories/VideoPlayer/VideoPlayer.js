import classes from './VideoPlayer.module.css'
import Youtube from 'react-youtube'
import {useContext,useState} from 'react'
import {CatagoriesContext} from '../../../Store/CatagoriesReducer'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle,faCheck} from '@fortawesome/free-solid-svg-icons';
import {useLocation} from 'react-router-dom'
import Notes from './Notes/Notes'

const VideoPlayer=()=>{
    const [openPlaylist,setOpenPlaylist]=useState(false)
    const [newPlaylistName,setNewPlaylistName]=useState("")
    const [note,setNote]=useState("")

    const {selectedVideo,addVideoToPlaylist,playlists,addNewPlaylist:addNewPlaylistAction,addNotes}=useContext(CatagoriesContext)


    const addNewPlaylist=async()=>{
        if(newPlaylistName.length>0){
            addNewPlaylistAction(newPlaylistName)
            setNewPlaylistName("")
        }else{
            alert("Please Enter a Name")
        }
    }

    const {pathname}=useLocation();
    return(
        <div className={pathname==="/video-player"? classes["video-player-page"]:classes["video-player"]}>
            <h1 className={classes["video-name"]}>
                {selectedVideo.name}
            </h1>
            <Youtube
                videoId={selectedVideo.link}
                className={classes["youtube-window"]}
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
            <hr/>
            <div className={classes["notes"]}>
                <h2>
                    Notes:
                </h2>
                <form 
                    className={classes["add-note"]}
                    onSubmit={event=>{
                        event.preventDefault();
                        addNotes(selectedVideo.id,{
                            name:"Random Name",
                            note:note
                        })
                        setNote("")
                    }}
                    >
                    <label>
                        <p>
                            Add note:
                        </p>
                        <div>
                            <input 
                                placeholder="Add a note"
                                value={note}
                                onChange={event=>setNote(event.target.value)}
                            />
                            <button 
                                type="submit"
                                className={`${classes["button-solid"]} ${classes["button-solid-primary"]}`}>
                                Add Note
                            </button>
                        </div>
                    </label>
                </form>
                <ul className={classes["notes-list"]}>
                    {
                        selectedVideo.notes&&selectedVideo.notes.map(({name,note})=>(
                            <li key={`${Math.random()}${name}${note}`}>
                                <Notes 
                                    name={name}
                                    note={note}
                                />
                            </li>
                        ))
                    }
                </ul>
                
            </div>
        </div>
    )
}

export default VideoPlayer