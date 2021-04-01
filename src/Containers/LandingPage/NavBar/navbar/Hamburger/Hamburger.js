import classes from './Hamburger.module.css';
import React,{ useState } from 'react';
import Dropdown from '../Drop/Dropdown';

const hamburger=React.memo(()=>{
    const [iconClicked,seticonClicked]=useState(false);
    
    let lineOne=classes["hamburger-line"];
    let lineTwo=classes["hamburger-line"];
    let lineThree=classes["hamburger-line"];

    let hamburgerClicked=()=>{
        seticonClicked(currentStatus=>!currentStatus);
    }

    if(iconClicked){
        lineOne=`${classes["hamburger-line"]} ${classes["line-top"]}`
        lineTwo=`${classes["hamburger-line"]} ${classes["line-middle"]}`
        lineThree=`${classes["hamburger-line"]} ${classes["line-bottom"]}`
    }

    return(
        <div className={classes["enclosing-div"]}>
            <div className={classes["hamburger-container"]} onClick={event=>hamburgerClicked(event)}>
                <div className={lineOne}></div>
                <div className={lineTwo}></div>
                <div className={lineThree}></div>
                
            </div>
            <Dropdown open={iconClicked}/>
        </div>
    )
})

export default hamburger;