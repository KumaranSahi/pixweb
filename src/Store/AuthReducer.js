import {useReducer,createContext,useState,useEffect,useContext} from 'react';
import {warningToast,successToast,infoToast} from '../UI/Toast/Toast'
import axios from '../useAxios'
import {useHistory} from 'react-router-dom'

export const AuthContext=createContext()

export const useAuth=()=>useContext(AuthContext)

export const AuthProvider=({children})=>{
    const [loading,setLoading]=useState(false)
    const {push}=useHistory();

    const authManipulation=(state,action)=>{
        switch (action.type) {
            case "SIGNIN_USER":
                return{
                    ...state,
                    userId:action.payload.userId,
                    token:action.payload.token,
                    userName:action.payload.userName,
                    expiresIn:action.payload.expiresIn
                }
            case "SIGNOUT_USER":
                return{
                    ...state,
                    userId:null,
                    token:null,
                    userName:null,
                    expiresIn:null
                }
            default:
                return state;
        }
    }

    const [state,dispatch]=useReducer(authManipulation,{
        userId:null,
        token:null,
        userName:null,
        expiresIn:null,
    })

    const [currentPage,setCurrentPage]=useState("SIGNIN_PAGE")

    const signUpUser=async (userData)=>{
        setLoading(true)
        try{
            const {data,status}=await axios.post('/api/users/signup',userData);
            if(data.ok){
                successToast("User Added Successfully")
                setCurrentPage("SIGNIN_PAGE")
                setLoading(false)
            }
            else{
                if(+status===208){
                    infoToast("User already exists in the pix ecosystem")
                    infoToast("Please Try loging in")
                }
                else
                    warningToast("Failed to add user")
                setLoading(false)
            }
        }catch(error){
            warningToast("Failed to add user")
            console.log(error)
            setLoading(false)
        }
    }

    const checkAuthTimeout=(expirationTime)=>{
        setTimeout(()=>{
            signOutUser()
        },
        expirationTime*1000
        )
    }

    const signInUser=async (userData)=>{
        setLoading(true)
        try{
            const {data:{data}}=await axios.post('/api/users/signin',userData);
            if(data.ok){
                localStorage.setItem("token",data.token);
                localStorage.setItem("userId",data.userId);
                localStorage.setItem("userName",data.userName);
                const expiresIn=new Date(new Date().getTime()+3600000);
                localStorage.setItem('expiresIn',expiresIn);
                checkAuthTimeout(3600)
                dispatch({
                    type:"SIGNIN_USER",
                    payload:{
                        userId:data.userId,
                        token:data.token,
                        userName:data.userName,
                        expiresIn:expiresIn
                    }
                })
                successToast("User Logged in Successfully")
                setLoading(false)
                push("/")
            }
        }catch(error){
            warningToast("Invalid username or password")
            console.log(error)
            setLoading(false)
        }
    }

    const signOutUser=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem('expiresIn');
        dispatch({
            type:"SIGNOUT_USER"
        })
        setLoading(false)
        push("/")
    }

    const onReload=()=>{
        const token=localStorage.getItem('token');
        if(!token){
            signOutUser()
        }else{
            const expiresIn=new Date(localStorage.getItem('expiresIn'));
            if(expiresIn<=new Date()){
                signOutUser()
            }
            else{
                const userId=localStorage.getItem('userId');
                const userName=localStorage.getItem('userName')
                checkAuthTimeout((expiresIn.getTime()-new Date().getTime())/1000)
                dispatch({
                    type:"SIGNIN_USER",
                    payload:{
                        userId:userId,
                        token:token,
                        userName:userName,
                        expiresIn:expiresIn
                    }
                })
            }
        }
    }

    const changePassword=async (userData)=>{
        setLoading(true)
        try{
            const {data}=await axios.post('/api/users/password',userData);
            if(data.ok){
                successToast("Password changed successfully");
                setCurrentPage("SIGNIN_PAGE");
            }
            setLoading(false)
        }catch(error){
            warningToast("Unable to change password please try again later")
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(()=>{
        onReload()
    },[])

    return(
        <AuthContext.Provider
            value={{
                userId:state.userId,
                token:state.token,
                userName:state.userName,
                expiresIn:state.expiresIn,
                dispatch:dispatch,
                signUpUser:signUpUser,
                signInUser:signInUser,
                signOutUser:signOutUser,
                currentPage:currentPage,
                changePassword:changePassword,
                setCurrentPage:setCurrentPage,
                authLoading:loading
            }}
        >
            {children}    
        </AuthContext.Provider>
    )
}