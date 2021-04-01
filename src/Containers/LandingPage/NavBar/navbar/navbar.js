import classes from './navbar.module.css'
import Logo from './Logo/Logo'
import Hamburger from './Hamburger/Hamburger'
import DesktopNavMenu from './DesktopNavMenu/DesktopNavMenu'

const Navbar=()=>{
    return(
        <nav>
            <div className={classes["navbar"]}>
                <Hamburger/>
                <Logo/>
            </div>
            <DesktopNavMenu/>
        </nav>
    )

}

export default Navbar;