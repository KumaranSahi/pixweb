import classes from './VideoNameList.module.css'
import {CatagoriesContext} from '../../Store/Catagories-context-reducer'
import { useContext } from 'react/cjs/react.development'

const VideoNameList=({closeDropDown})=>{
    const {videosByCatagory,dispatch}=useContext(CatagoriesContext)
    return(
        <ul className={classes["video-name-list"]}>
            {
                videosByCatagory.map((item)=>(
                    <li key={item.id}
                        onClick={()=>{dispatch({
                            type:"SELECT_VIDEO",
                            payload:{...item}
                        })
                        closeDropDown&&closeDropDown()
                        }}
                    >
                        <p>
                        {item.name}
                        </p>
                    </li>
                ))
            }
        </ul>
    )
}

export default VideoNameList