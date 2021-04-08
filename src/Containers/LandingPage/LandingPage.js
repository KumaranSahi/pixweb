import Navbar from './NavBar/navbar/navbar'
import MobileNavBar from './NavBar/MobileNavBar/MobileNavBar'
import HomePage from '../HomePage/HomePage'
import {Redirect, Route,Switch,useLocation} from 'react-router-dom'
import Catagories from '../Catagories/Catagories'
import {CatagoriesContext} from '../../Store/Catagories-context-reducer'
import PlaylistPage from '../PlaylistPage/PlaylistPage'
import {useEffect,useContext} from 'react'
import VideoPlayer from '../Catagories/VideoPlayer/VideoPlayer'

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
                <Route path="/" component={HomePage}/>
            </Switch>
            <MobileNavBar/>
        </div>
    )
}

export default LandingPage;