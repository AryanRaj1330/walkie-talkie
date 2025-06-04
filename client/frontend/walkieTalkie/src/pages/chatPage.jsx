import React from 'react'
import axios from "axios"
import { useEffect,useState } from 'react'

const ChatPage = () => {
    const [chat,setChat]= useState([])
    const getChats= async ()=>{
        try{
            const data= await axios.get("/api/chats")
            setChat(data.data)
        }
        catch(error) {
            console.log('Error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
    }
    }

    useEffect(()=>{
        getChats()
    },[])


  return (
    <div>{chat.map((chat)=><div key={chat._id} >{chat.chatName}</div>)}</div>
  )
}

export default ChatPage