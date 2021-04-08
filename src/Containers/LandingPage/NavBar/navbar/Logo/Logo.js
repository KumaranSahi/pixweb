import {Link} from 'react-router-dom'
import classes from './Logo.module.css';
import Logo from '../../../../../Assets/mk logo finD.png'

const logo=()=>{
    return(
        <>
        <Link to="/">
            <div className={classes['pixweb-title']}>
                <img src={Logo} className={classes["logo"]} alt="logo"/>
                <h1>Pixweb</h1>
            </div>
        </Link>
        </>
    )
}

export default logo;