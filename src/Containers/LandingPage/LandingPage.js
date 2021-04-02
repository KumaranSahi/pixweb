import classes from './LandingPage.module.css'
import Navbar from './NavBar/navbar/navbar'
import MobileNavBar from './NavBar/MobileNavBar/MobileNavBar'
import {useEffect} from 'react'
import axios from 'axios'

const LandingPage=()=>{
    useEffect(()=>{
        (async()=>{
            const data=await axios.get('/api/astro-photography')
            console.log(data)
        })()
    },[])

    return(
        <div>
            <Navbar/>
            <MobileNavBar/>
        </div>
    )
}

export default LandingPage;