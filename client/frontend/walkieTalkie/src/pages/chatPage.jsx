import React from 'react'
import axios from "axios"
import { useEffect,useState } from 'react'
import {Button} from '@chakra-ui/react'
import SideDrawer from '../components/miscellaneous/sideDrawer.jsx'
import { chatState } from '../context/chatContext'

const ChatPage = () => {
  const {user}= chatState()
  useEffect(()=>{
    console.log(`user=${user}`)
  },[user])
  return (
    <>
      <div style={{width:"100%"}}>
        {user&&<SideDrawer/>}
      </div>
    </>
  )
}

export default ChatPage