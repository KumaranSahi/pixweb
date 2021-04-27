import classes from './Dropdown.module.css'
import VideoNameList from '../../../../VideoNameList/VideoNameList'

const Dropdown=({open,closeDropDown})=>{
    
    return open?(<div className={classes["dropdown-menu"]}>
            <VideoNameList closeDropDown={closeDropDown}/>
        </div>):null
}

export default Dropdown