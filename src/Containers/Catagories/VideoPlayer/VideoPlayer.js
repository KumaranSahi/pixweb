import classes from './VideoPlayer.module.css'
import Youtube from 'react-youtube'
import {useState} from 'react'
import {useAuth} from '../../../Store/AuthReducer'
import {useCatagory} from '../../../Store/CatagoriesReducer'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle,faCheck} from '@fortawesome/free-solid-svg-icons';
import {useLocation,useHistory} from 'react-router-dom'
import Notes from './Notes/Notes'

const VideoPlayer=()=>{
    const [openPlaylist,setOpenPlaylist]=useState(false)
    const [newPlaylistName,setNewPlaylistName]=useState("")
    const [note,setNote]=useState("")

    const {push}=useHistory()

    const {selectedVideo,addToHistory,addVideoToPlaylist,
        playlists,addNewPlaylist:addNewPlaylistAction
        ,addNotes,addLikeToVideo,removeLikeFromVideo}=useCatagory()

    const {token,userId}=useAuth()

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
                onPlay={()=>{
                    addToHistory(selectedVideo._id)
                }}
            />
            <div className={classes["options-bar"]}>
                <h2>
                    Author: {selectedVideo.author}
                </h2>
                <div className={classes["watchlist-dropdown-container"]}>
                    {selectedVideo.likes.some(item=>item.by===userId)?
                    <button
                        className={`${classes["button-solid"]} ${classes["button-solid-primary"]}`}
                        onClick={()=>{
                            if(token){
                                removeLikeFromVideo(selectedVideo.likes.filter(({by})=>by===userId)[0])
                            }else
                                push("/login")
                        }}
                    >
                        Liked ({selectedVideo.likes.length})
                    </button>:<button
                        className={`${classes["button-outline"]} ${classes["button-primary"]}`}
                        onClick={()=>{
                            if(token){
                                addLikeToVideo(selectedVideo._id)
                            }else
                                push("/login")
                        }}
                    >
                        Like ({selectedVideo.likes.length})
                    </button>
                    }
                    <button 
                        className={`${classes["button-outline"]} ${classes["button-primary"]}`}
                        onClick={()=>{
                            token?setOpenPlaylist(status=>!status):push("/login")
                        }}
                        >
                        Add To Playlist
                    </button>
                    {openPlaylist&&<ul className={classes["watchlist-dropdown"]}>
                        {
                            playlists.map((item)=>(
                                <li key={item._id}
                                    onClick={()=>{
                                        if(token){
                                            addVideoToPlaylist(selectedVideo,item)
                                            setOpenPlaylist(status=>!status)
                                        }else{
                                            push("/login")
                                        }
                                    }}
                                    className={item.videos.some(item=>item._id===selectedVideo._id)?classes["video-active"]:null}
                                >
                                    <p>
                                        {item.name}
                                    </p>
                                    {item.videos.some(item=>item._id===selectedVideo._id)&&<FontAwesomeIcon icon={faCheck}/>}
                                </li>
                            ))
                        }
                        <li>
                            <form className={classes["add-new-playlist"]} onSubmit={(event)=>{
                                    event.preventDefault()
                                    if(token){
                                        addNewPlaylist(newPlaylistName)
                                    }else{
                                        push('/login')
                                    }
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
                {token&&(<form 
                    className={classes["add-note"]}
                    onSubmit={event=>{
                        event.preventDefault();
                        addNotes(selectedVideo._id,note)
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
                </form>)}
                <ul className={classes["notes-list"]}>
                    {
                        selectedVideo.notes&&selectedVideo.notes.map(({_id,content,by:{name:userName,_id:userId}})=>(
                            <li key={`${Math.random()}${userName}${content}`}>
                                <Notes 
                                    name={userName}
                                    note={content}
                                    id={userId}
                                    noteId={_id}
                                    videoId={selectedVideo._id}
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