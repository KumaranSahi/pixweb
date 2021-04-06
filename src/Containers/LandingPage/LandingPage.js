import Navbar from './NavBar/navbar/navbar'
import MobileNavBar from './NavBar/MobileNavBar/MobileNavBar'
import HomePage from '../HomePage/HomePage'
import {Route,Switch} from 'react-router-dom'
import Catagories from '../Catagories/Catagories'
import {CatagoriesProvider} from '../../Store/Catagories-context-reducer'

const LandingPage=()=>{
    return(
        <div>
            <CatagoriesProvider>
                <Navbar/>
                <Switch>
                    <Route path="/catagory/:id" component={Catagories}/>
                    <Route path="/" component={HomePage}/>
                </Switch>
                <MobileNavBar/>
            </CatagoriesProvider>
        </div>
    )
}

export default LandingPage;