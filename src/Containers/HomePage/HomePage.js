import classes from './HomePage.module.css'
import Carousel from './HomeImage/HomeImage'

const HomePage=()=>{
    return(
        <div className={classes["homepage-container"]}>
            <Carousel/>
        </div>
    )
}

export default HomePage;