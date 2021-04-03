import Navbar from './NavBar/navbar/navbar'
import MobileNavBar from './NavBar/MobileNavBar/MobileNavBar'
import HomePage from '../HomePage/HomePage'
import {Route} from 'react-router-dom'

const LandingPage=()=>{
    return(
        <div>
            <Navbar/>
            <Route path="/" component={HomePage}/>
            <MobileNavBar/>
        </div>
    )
}

export default LandingPage;