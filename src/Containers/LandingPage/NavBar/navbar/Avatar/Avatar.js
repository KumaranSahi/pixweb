import classes from './Avatar.module.css';
import {useState} from 'react'
import {useAuth} from '../../../../../Store/AuthReducer'
import profileImage from '../../../../../Assets/profileimage.jpg'
import {Link,useLocation} from 'react-router-dom'

const Avatar=()=>{
    const {userName,signOutUser}=useAuth()

    const [openDropdown,setOpenDropdown]=useState(false)

    let avatar=null
    let {pathname}=useLocation();
    if(userName){
        avatar=(
            <div className={classes["name-avatar-container"]}>
                <p onClick={()=>setOpenDropdown(open=>!open)}>Hello, {userName}</p>
                <div className={classes["avatar-container"]}>
                    <img src={profileImage} className={classes["avatar"]}  alt="Active avatar" onClick={()=>setOpenDropdown(open=>!open)}/>
                    <div className={`${classes["avatar-bubble"]} ${classes["bubble-active"]}`}></div>
                    {openDropdown&&<ul className={classes["signout-dropdown"]}>
                        <li
                            onClick={()=>{
                                signOutUser()
                                setOpenDropdown(false)
                            }}
                        >
                            Sign out
                        </li>                        
                    </ul>}
                </div>
            </div>
        )
    }else{
        avatar=pathname!=="/login"&&(
            <div className={classes["name-avatar-container"]}>
                <Link to="/login">
                    Login          
                </Link>
            </div>
        )
    }

    return(
        <div>
            {avatar}            
        </div>
    )
}

export default Avatar;