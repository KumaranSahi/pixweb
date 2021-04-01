import classes from './DesktopNavMenu.module.css'
import {NavLink} from 'react-router-dom'
// import {useContext} from 'react';

const DesktopNavMenu=()=>{
    return(
        <div className={`${classes["navigation-items-desktop"]} ${classes["sticky-status-margin-top"]}`}>
                <p className={classes["nav-button"]}>
                    <NavLink to="/" exact activeClassName={classes["active-desktop"]}>
                        Catagories
                    </NavLink>
                </p>
                <p className={classes["nav-button"]}>
                    <NavLink to="/my-playlist" exact activeClassName={classes["active-desktop"]}>
                        My Playlists
                    </NavLink>
                </p>
                <p className={classes["nav-button"]}>
                    <NavLink to="/history" activeClassName={classes["active-desktop"]}>
                        History
                    </NavLink>
                </p>
                
            </div>
    )
}

export default DesktopNavMenu