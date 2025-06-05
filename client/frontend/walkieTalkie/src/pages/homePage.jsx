import React from 'react'
import "../css/homepage.css"
import {useState} from "react"

const HomePage = () => {
  const [isLogin,setIsLogin]= useState(true)
  const [name,setName]= useState("")
  const [email,setEmail]= useState()
  const [password,setPassword]= useState()
  

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
                <input type="email" placeholder="Enter your email" required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" required />
              </div>
              <button type="submit" className="submit-btn">Sign In</button>
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
                <input type="text" placeholder="Enter your full name" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="Create a password" required />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" placeholder="Confirm your password" required />
              </div>
              <button type="submit" className="submit-btn">Create Account</button>
              <div className="divider"><span>or</span></div>
              <div className="social-login">
                <a href="#" className="social-btn google">Google</a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default HomePage