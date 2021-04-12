import Navbar from './NavBar/navbar/navbar'
import MobileNavBar from './NavBar/MobileNavBar/MobileNavBar'
import HomePage from '../HomePage/HomePage'
import {Redirect, Route,Switch,useLocation} from 'react-router-dom'
import Catagories from '../Catagories/Catagories'
import {CatagoriesContext} from '../../Store/CatagoriesReducer'
import PlaylistPage from '../PlaylistPage/PlaylistPage'
import {useEffect,useContext} from 'react'
import VideoPlayer from '../Catagories/VideoPlayer/VideoPlayer'
import HistoryPage from '../History/History'
import LoginPage from '../LoginPage/LoginPage'

const VideoPlayerRoute=({...props})=>{
    const {selectedVideo}=useContext(CatagoriesContext)
    return(
        selectedVideo?<Route {...props}/>:<Redirect to="/"/>
    )
}


const LandingPage=()=>{
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    
    return(
        <div>
            <Navbar/>
            <Switch>
                <Route path="/catagory/:id" component={Catagories}/>
                <Route path="/my-playlist" component={PlaylistPage}/>
                <VideoPlayerRoute path="/video-player" component={VideoPlayer}/>
                <Route path="/history" component={HistoryPage}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/" component={HomePage}/>
            </Switch>
            <MobileNavBar/>
        </div>
    )
}

export default LandingPage;