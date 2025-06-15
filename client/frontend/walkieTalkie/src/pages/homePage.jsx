import React from 'react'
import "../css/homepage.css"
import {useState,useEffect} from "react"
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useHistory} from "react-router-dom"


const HomePage = () => {
  const history=useHistory()
  const userInfo= JSON.parse(localStorage.getItem("userInfo"))
  if(userInfo) history.push("/chats")

  const [isLogin,setIsLogin]= useState(true)
  const [name,setName]= useState("")
  const [emailRegister,setEmailRegister]= useState("")
  const [passwordRegister,setPasswordRegister]= useState("")
  const [confirmPassword,setConfirmPassword]= useState("")
  const [email,setEmail]= useState("")
  const [password,setPassword]= useState("")
  const [loggedIn,setLoggedIn]= useState(false)
  
  const login=async(e)=>{
    e.preventDefault()
    try{
      const response=await axios.post("http://localhost:5000/api/user/login",{
        email:email,
        password:password
      })
      const data=response.data
      toast.success("Logged in successfully")
      console.log(data)
      setLoggedIn(true)
    }
    catch(error){
      const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message
      toast.error("Login Failed: "+message)
    }
  }
  const signUp=async(e)=>{
    e.preventDefault()
    if(confirmPassword!==passwordRegister){
      toast.error("Password and confirm password doesn't match")
      return
    }
    try{
      const response=await axios.post("http://localhost:5000/api/user/",{
        name:name,
        email:emailRegister,
        password:passwordRegister
      })
      const data=response.data
      toast.success("User Registered")
      console.log(data)
      setIsLogin(true)
    }
    catch(error){
      const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message
      toast.error("Registration failed: "+message)
    }
  }

  useEffect(()=>{
    if(loggedIn){
      history.push("/chats")
    }    
  },[loggedIn,History])
  
  return (
    <>
     <div className="page-background">
      <div className="container">
        <div className="toggle-container">
          <button
            className={`toggle-btn ${isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`toggle-btn ${!isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <div className="form-container">
          {isLogin ? (
            <form className="form">
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" required />
              </div>
              <button type="submit" className="submit-btn" onClick={login} >Sign In</button>
              <div className="forgot-password">
                <a href="#">Forgot your password?</a>
              </div>
              <div className="divider"><span>or</span></div>
              <div className="social-login">
                <a href="#" className="social-btn google">Google</a>
              </div>
            </form>
          ) : (
            <form className="form">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your full name" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={emailRegister} onChange={(e)=>setEmailRegister(e.target.value)} placeholder="Enter your email" required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" value={passwordRegister} onChange={(e)=>setPasswordRegister(e.target.value)} placeholder="Create a password" required />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Confirm your password" required />
              </div>
              <button type="submit" className="submit-btn" onClick={signUp} >Create Account</button>
              <div className="divider"><span>or</span></div>
              <div className="social-login">
                <a href="#" className="social-btn google">Google</a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
    <ToastContainer/>
    </>
  )
}

export default HomePage