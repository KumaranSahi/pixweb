import {useReducer,createContext,useState,useEffect} from 'react';
import {warningToast,successToast,infoToast} from '../UI/Toast/Toast'
import axios from 'axios'

export const AuthContext=createContext()

export const AuthProvider=({children})=>{
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
        try{
            const {data,status}=await axios.post('/api/users/signup',userData);
            if(data.ok){
                successToast("User Added Successfully")
                setCurrentPage("SIGNIN_PAGE")
            }
            else{
                if(+status===208){
                    infoToast("User already exists in the pix ecosystem")
                    infoToast("Please Try loging in")
                }
                else
                    warningToast("Failed to add user")
            }
        }catch(error){
            warningToast("Failed to add user")
            console.log(error)
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
                successToast("User Added Successfully")
                setCurrentPage("SIGNIN_PAGE")
            }
        }catch(error){
            warningToast("Invalid username or password")
            console.log(error)
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
                setCurrentPage:setCurrentPage
            }}
        >
            {children}    
        </AuthContext.Provider>
    )
}