import React from 'react'
import axios from "axios"
import { useEffect,useState } from 'react'
import {Box, Button} from '@chakra-ui/react'
import SideDrawer from '../components/miscellaneous/sideDrawer.jsx'
import { chatState } from '../context/chatContext'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js'
import ChatBox from '../components/userAvatar/ChatBox.jsx'
import MyChats from '../components/userAvatar/MyChats.jsx'

const ChatPage = () => {
  const history= useHistory()
  const {user}= chatState()
  const[fetchAgain,setFetchAgain]= useState()
  useEffect(()=>{
    const userData=localStorage.getItem("userInfo")
    if(!userData) history.push("/")
  },[history])

  return (
    <>
      <div style={{width:"100%"}}>
        {user&&<SideDrawer/>}
        <Box display="flex" justifyContent="space-between" width="100%" height="91.5vh" padding={10}>
          {user&&<MyChats fetchAgain={fetchAgain} />}
          {user&&<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
        </Box>
      </div>
    </>
  )
}
export default ChatPage