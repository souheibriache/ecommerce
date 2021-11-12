import React, { useState } from 'react'
import {useDispatch , useSelector} from 'react-redux'
import { login } from '../../redux/apiCalls'
import './Login.css'
const Login = () => {
    const [username , setUsername] = useState("")
    const [password , setpassword] = useState("")
    const dispatch = useDispatch()
    
    const user = useSelector(state => state.user)
    const handleClick = (e) => {
        e.preventDefault()
        login(dispatch , {username , password })
        
    }
    return (
        <form style={{display: 'flex', flexDirection: 'column',alignItems: "center" , justifyContent: "center" , height: "100vh"}}>
            <input style={{padding : 10 , marginBottom : 20}} type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)}></input>
            <input style={{padding : 10 , marginBottom : 20}} type="password" placeholder="Password" onChange={(e) => setpassword(e.target.value)}></input>
            <button style={{padding : 10 , width : 100 , }} onClick={(e) =>handleClick(e)} >Login </button>
        </form>
    )
}

export default Login
