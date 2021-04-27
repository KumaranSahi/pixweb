import classes from './Notes.module.css';
import {useAuth} from '../../../../Store/AuthReducer'
import {useCatagory} from '../../../../Store/CatagoriesReducer'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

const Notes=({name,note,id,noteId,videoId})=>{
    const {userId}=useAuth();
    const {deleteNote}=useCatagory()
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