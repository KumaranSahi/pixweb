import classes from './Dropdown.module.css'

const Dropdown=({open})=>{
    
    return open?(<div className={classes["dropdown-menu"]}>
            
        </div>):null
}

export default Dropdown