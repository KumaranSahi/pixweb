import classes from './HomeImage.module.css'
import Logo from '../../../Assets/mk logo finD.png'

const Carousel=()=>{
    return(
        <div className={classes["home-image-container"]}>
            <div className={classes['pixweb-title']}>
                <img src={Logo} className={classes["logo"]} alt="logo"/>
                <h1>Pixweb</h1>
            </div>
            <h1 className={classes["tagline"]}>
                Learn form the <span>Best</span> about the art of <span>Photography!</span>
            </h1>
        </div>
    )
}

export default Carousel;