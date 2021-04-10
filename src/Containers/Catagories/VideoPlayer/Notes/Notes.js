import classes from './Notes.module.css';

const Notes=({name,note})=>{
    return(
        <div className={classes["note"]}>
            <h3>{name}</h3>
            <p>{note}</p>
            <hr/>
        </div>
    )
}

export default Notes;