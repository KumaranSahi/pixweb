import classes from './LandingPage.module.css'
import Navbar from './NavBar/navbar/navbar'
import MobileNavBar from './NavBar/MobileNavBar/MobileNavBar'

const LandingPage=()=>{
    return(
        <div>
            <Navbar/>
            <MobileNavBar/>
        </div>
    )
}

export default LandingPage;