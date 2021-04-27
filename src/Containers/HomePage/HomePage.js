import classes from './HomePage.module.css'
import HomeImage from './HomeImage/HomeImage'
import HomePageCatagories from './HomePageCatagories/HomePageCatagories'

const HomePage=()=>{
    return(
        <div className={classes["homepage-container"]}>
            <HomeImage/>
            <HomePageCatagories/>
        </div>
    )
}

export default HomePage;