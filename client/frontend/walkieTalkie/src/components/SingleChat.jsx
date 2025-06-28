import React, { useEffect, useState } from 'react'
import { chatState } from '../context/chatContext'
import { Box, Center, Field, Input, Spinner, Text} from '@chakra-ui/react'
import UpdateGroupChatModal from './userAvatar/UpdateGroupChatModal'
import {getSender, getSenderFull} from '../config/chatLogic'
import ProfileModal from './miscellaneous/profileModal'
import axios from 'axios'
import { toast,ToastContainer } from 'react-toastify'
import "../css/chatLine.css"
import ScrollableChats from './ScrollableChats'
import io from "socket.io-client"

const ENDPOINT="http://localhost:5000"
var socket,selectedChatCompare


const singleChat = ({fetchAgain,setFetchAgain}) => {
    const {user,selectedChat,setSelectedChat,notifications,setNotifications}= chatState()
    const[messages,setMessages]= useState([])
    const[newMessage,setNewMessage]= useState("")
    const[loading,SetLoading]= useState(false)
    const[socketConnected,setSocketConnected]= useState(false)
    const[typing,setTyping]= useState(false)
    const[isTyping,setIsTyping]= useState(false)

    useEffect(()=>{
      socket= io(ENDPOINT)
      socket.emit("setup",user)
      socket.on("connected",()=>setSocketConnected(true))
      socket.on("typing",()=>{
        console.log("TYPING EVENT RECEIVED");
        setIsTyping(true)
      })
      socket.on("stop typing",()=>{
        console.log("STOP TYPING EVENT RECEIVED")
        setIsTyping(false)
      })
    },[])

    const fetchMessages=async()=>{
      if(!selectedChat) return

      try{
        const config={
          headers:{
            Authorization:`Bearer ${user.JWT_TOKEN}`
          }
       }
       SetLoading(true)
        const {data}= await axios.get(`/api/message/${selectedChat._id}`,config)
        setMessages(data)
        socket.emit("join chat room",selectedChat._id)
        SetLoading(false)
      } 
      catch(error){
        toast.error(`Error= ${error.message}`)
        console.log(error)
      }
    }
    useEffect(()=>{
      fetchMessages()

      selectedChatCompare=selectedChat
    },[selectedChat])

    useEffect(()=>{
      console.log(notifications,"-----")
    },[notifications])
    useEffect(()=>{
      socket.on("message received",(newMessageReceived)=>{
        if(!selectedChatCompare||selectedChatCompare._id!==newMessageReceived.chat._id){
          if(!notifications.include(newMessageReceived)){
            setNotifications([newMessageReceived,...notifications])
            setFetchAgain(!fetchAgain)
          }
        }
        else{
          setMessages((prev)=>[...prev,newMessageReceived])
        }
      })
    },[])
    const sendMessage=async(event)=>{
      if(event.key==="Enter"&&newMessage){
        socket.emit("stop typing",selectedChat._id)
        try{
          const config={
            headers:{
              "Content-type":"application/json",
              Authorization:`Bearer ${user.JWT_TOKEN}`
            }
          }
          setNewMessage("")
          const {data}= await axios.post("/api/message",{
            content:newMessage,
            chatId:selectedChat._id
          },config)

          socket.emit("new message",data)
          setMessages([...messages,data])
        } 
        catch(error){
          toast.error(`Error= ${error.message}`)
          console.log(error)
        }
      }
    }
    const typingHandler=(e)=>{
      setNewMessage(e.target.value)

      if(!socketConnected) return

      if(!typing){
        setTyping(true)

        socket.emit("typing",selectedChat._id)
      }

      let lastTyping= new Date().getTime()

      setTimeout(()=>{
        var timeNow= new Date().getTime()
        var timeDiff=timeNow-lastTyping

        if(timeDiff>=3000&&typing){
          socket.emit("stop typing",selectedChat._id)
          setTyping(false)
        }
      },3000)
    }
    
  return (
    <>
      {selectedChat?(
        <>
        <Box
          display="flex"
          fontSize={{base:"20px",md:"25px"}}
          pb={3}
          px={2}
          w="100%"
          style={{fontFamily:"Arial"}}
          justifyContent="space-between"
          alignItems="center"
        >
          {!selectedChat.isGroupChat?(
            <>
              {getSender(user,selectedChat.users)}
              <ProfileModal handleFunction={getSender(user,selectedChat.users)} handleFunction2={getSenderFull(user,selectedChat.users)} />
            </>):(
            <>
              {selectedChat.chatName}
              <UpdateGroupChatModal fetchMessages={fetchMessages} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>            
            </>
          )}
        </Box>
        <Box
          display="flex"
          flexDir="column"
          justifyContent="flex-end"
          p={3}
          bg="#E8E8E8"
          w="100%"
          h="100%"
          borderRadius="lg"
          overflowY="hidden"
        >
          {loading?(<Spinner size="xl" alignSelf={"center"} w={20} h={20} margin="auto"/>):(
            <div className="messages"><ScrollableChats messages={messages}/></div>
          )}

          {isTyping?(<div>Loading...</div>):(
            <></>
          )}
          <Field.Root required>
            <Input placeholder='Your message here' onKeyDown={sendMessage} onChange={typingHandler} value={newMessage} borderWidth={2} borderColor="black" />
          </Field.Root>
        </Box>
        </>
      ):(
        <Box display="flex" alignItems="center" justifyContent="center" height="100%">
          <Text fontSize="2xl" pb={3} style={{fontFamily:"Arial"}}>
            Click on a User to start chatting
          </Text>
        </Box>
      )}
      <ToastContainer/>
    </>
  )
}

export default singleChat