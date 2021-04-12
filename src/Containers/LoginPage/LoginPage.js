import classes from './LoginPage.module.css';
import {useState,useContext} from 'react'
import {CatagoriesContext} from '../../Store/CatagoriesReducer'

const LoginPage=()=>{

    const {signUpUser}=useContext(CatagoriesContext)

    const [userName,setUserName]=useState("")
    const [userNameValid,setUserNameValid]=useState(true)

    const [email,setEmail]=useState("")
    const [emailValid,setEmailValid]=useState(true)

    const [password,setPassword]=useState("")

    const validateUserName=()=>{
        if(userName.length===0)
            setUserNameValid(false)
        else
            setUserNameValid(true)
    }
    
    const validateEmail=()=>{
        if(email.length>0 && new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$").test(email))
            setEmailValid(true)
        else
            setEmailValid(false)
    }

    const signUpSubmit=async (event)=>{
        event.preventDefault();
        validateUserName();
        validateEmail();
        if(userNameValid && emailValid){
            signUpUser({
                name:userName,
                email:email,
                password:password
            })
        }
    }
    
    return(
        <div className={classes["login-container"]}>
            <img
                src="https://res.cloudinary.com/docpuxue8/image/upload/v1618250089/PixWeb/LoginPageBackground_fww2yn.jpg"
                alt="login"
                className={classes["login-image"]}
            />
            <div className={classes["login"]}>
                <div className={classes["signin-signup-container"]}>
                    <h1>
                        Sign In:
                    </h1>
                    <form 
                        className={classes["signup-container"]}
                        onSubmit={signUpSubmit}
                    >
                        <div>
                            <input type="text" 
                                className={classes["textbox"]} 
                                placeholder="Username"
                                required
                                value={userName}
                                onChange={event=>setUserName(event.target.value)}
                            />
                            {!userNameValid&&<p className={classes["error-text"]}>Please enter a valid user name</p>}
                        </div>
                        <div>
                            <input type="text" 
                                className={classes["textbox"]} 
                                placeholder="Email"
                                required
                                value={email}
                                onChange={event=>setEmail(event.target.value)}
                            />
                            {!emailValid&&<p className={classes["error-text"]}>Please enter a valid email</p>}
                        </div>
                        <input 
                            type="password" 
                            className={classes["textbox"]} 
                            placeholder="Password"
                            required
                            value={password}
                            onChange={event=>setPassword(event.target.value)}
                        />
                        <button 
                            type="submit"
                            className={`${classes["button-solid"]} ${classes["button-primary"]}`}    
                        >
                            Sign up!
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;