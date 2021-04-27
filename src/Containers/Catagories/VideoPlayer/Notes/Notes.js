import classes from './Notes.module.css';
import {useContext} from 'react'
import {AuthContext} from '../../../../Store/AuthReducer'
import {CatagoriesContext} from '../../../../Store/CatagoriesReducer'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

const Notes=({name,note,id,noteId,videoId})=>{
    const {userId}=useContext(AuthContext);
    const {deleteNote}=useContext(CatagoriesContext)
    return(
        <div className={classes["note"]}>
            <div className={classes["name-delete-container"]}>
                <h3>{name}</h3>
                {userId === id&& <FontAwesomeIcon
                    icon={faTrash}
                    onClick={()=>{
                        deleteNote(noteId,videoId)
                    }}
                />}
            </div>
            <p>{note}</p>
            <hr/>
        </div>
    )
}

export default Notes;