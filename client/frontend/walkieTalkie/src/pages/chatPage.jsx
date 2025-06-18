import React from 'react'
import axios from "axios"
import { useEffect,useState } from 'react'
import {Button} from '@chakra-ui/react'
import SideDrawer from '../components/miscellaneous/sideDrawer.jsx'
import { chatState } from '../context/chatContext'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js'

const ChatPage = () => {
  const history= useHistory()
  const {user}= chatState()
  useEffect(()=>{
    console.log(`user=${user}`)
    const userData=localStorage.getItem("userInfo")
    if(!userData) history.push("/")
  },[history])

  return (
    <>
      <div style={{width:"100%"}}>
        {user&&<SideDrawer/>}
      </div>
    </>
  )
}
export default ChatPage