import React, { useEffect, useState } from 'react'
import { chatState } from '../../context/chatContext'
import { toast, ToastContainer } from 'react-toastify'
import axios from "axios"
import { Box, Button, Stack, Text } from '@chakra-ui/react'
import "../../css/myChats.css"
import ChatLoading from '../miscellaneous/ChatLoading'
import chat from '../../../../../../server/backend/models/chatModel'
import getSender from '../../config/chatLogic'

const MyChats = () => {
    const {user,chats,setChats,selectedChat,setSelectedChat}= chatState()
    const[loggedUser,setLoggedUser]= useState()

    const fetchChats=async()=>{
        try{
          const config={
            headers:{
              Authorization: `Bearer ${user.JWT_TOKEN}`
            }
          }

          const {data} = await axios.get("api/chat",config)
          setChats(data)
          console.log(data)
        }
        catch(error){
          toast.error(`Error= ${error.message}`)
          console.log(error)
        }
    }

    useEffect(()=>{
      setLoggedUser(JSON.parse(localStorage.getItem("userInfo")))
      fetchChats()
    },[])
  return (
    <>
    <Box
    display={{base:selectedChat?"none":"flex",md:"flex"}}
    flexDir="column"
    alignItems="flex-start"
    p={3}
    bg="white"
    width={{base:"100%",md:"31%"}}
    borderRadius="lg"
    borderWidth="1px"
    >
      <Box id="my-chat-box"
      pb={3}
      px={3}
      fontSize={{base:"28px",md:"30px"}}
      display="flex"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      >
        My Chats
        <Button
          bg="white"
          borderRadius={4}
          color="black"
          borderWidth="2px"
          borderColor={"black"}
          display="flex"
          fontSize={{base:"17px",md:"10px",lg:"17px"}}
        >
          New Group Chat <i className="fa-solid fa-plus"></i>
        </Button>
      </Box>
      <Box
      display="flex"
      flexDir="column"
      p="3px"
      bg="#F8F8F8"
      width="100%"
      height="100%"
      borderRadius="lg"
      overFlowY="hidden"
      >
        {chats?(
          <Stack overFlowY="scroll">
            {chats.map((chat)=>{
              <Box
                onClick={()=>setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat===chat?"38B2AC":"#E8E8E8"}
                color={selectedChat===chat?"white":"black"}
                px={3}
                py={2}
                borderRadius={"lg"}
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat?(
                    getSender(loggedUser,chat.users)
                  ):chat.chatName}
                </Text>
              </Box>
            })}
          </Stack>
        ):
        (<ChatLoading/>)}
      </Box>
    </Box>
    <ToastContainer/>
    </>
  )
}

export default MyChats