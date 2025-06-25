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


const singleChat = ({fetchAgain,setFetchAgain}) => {
    const {user,selectedChat,setSelectedChat}= chatState()
    const[messages,setMessages]= useState([])
    const[newMessage,setNewMessage]= useState("")
    const[loading,SetLoading]= useState(false)

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
        SetLoading(false)
      } 
      catch(error){
        toast.error(`Error= ${error.message}`)
        console.log(error)
      }
    }
    useEffect(()=>{
      fetchMessages()
    },[selectedChat])
    const sendMessage=async(event)=>{
      if(event.key==="Enter"&&newMessage){
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
          overFlowY="hidden"
        >
          {loading?(<Spinner size="xl" alignSelf={"center"} w={20} h={20} margin="auto"/>):(
            <div className="messages"><ScrollableChats messages={messages}/></div>
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