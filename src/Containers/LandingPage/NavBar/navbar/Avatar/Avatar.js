import classes from './Avatar.module.css';
import {useContext} from 'react'
import {AuthContext} from '../../../../../Store/AuthReducer'
import profileImage from '../../../../../Assets/profileimage.jpg'

const Avatar=()=>{
    const {userName}=useContext(AuthContext)
    let avatar=null

    if(userName){
        avatar=(
            <div className={classes["name-avatar-container"]}>
                <p>Hello, {userName}</p>
                <div className={classes["avatar-container"]}>
                    <img src={profileImage} className={classes["avatar"]}  alt="Active avatar"/>
                    <div className={`${classes["avatar-bubble"]} ${classes["bubble-active"]}`}></div>
                </div>
            </div>
        )
    }else{
        avatar=(
            <div className={classes["name-avatar-container"]}>
                <p>Login</p>
                <div className={classes["avatar-container"]}>
                    <img src="https://via.placeholder.com/80" className={classes["avatar"]}  alt="Inactive avatar"/>
                    <div className={`${classes["avatar-bubble"]} ${classes["bubble-inactive"]}`}></div>
                </div>
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