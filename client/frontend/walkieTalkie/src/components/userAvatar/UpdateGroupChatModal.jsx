import { Box, Button, CloseButton, Dialog, Input, Portal } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { chatState } from '../../context/chatContext'
import { toast,ToastContainer } from 'react-toastify'
import { useDisclosure } from '@chakra-ui/react'
import UserBadge from './UserBadge'
import axios from 'axios'
import ChatLoading from '../miscellaneous/ChatLoading'
import UserListItem from './UserListItem'

const UpdateGroupChatModal = ({fetchAgain,setFetchAgain,fetchMessages}) => {
  const {selectedChat,setSelectedChat,user}= chatState()
  const {isOpen,onOpen,onClose}= useDisclosure()
  const[groupChatName,setGroupChatName]= useState("")
  const[search,setSearch]= useState("")
  const[searchResult,setSearchResult]= useState([])
  const[loading,setLoading]= useState(false)
  const[renameLoading,setRenameLoading]= useState(false)
  const handleSearch=async(query)=>{
    setSearch(query)
    if(query===""){
      return
    }
    try{
      setLoading(true)

      const config={
        headers:{
          Authorization:`Bearer ${user.JWT_TOKEN}`
        }
      }

      const {data}= await axios.get(`/api/user?search=${search}`,config)
      console.log(data)
      setSearchResult(data)
      setLoading(false)
    } 
    catch(error){
      toast.error(`Error= ${error.message}`)
      console.log(error)
    }
  }
  const handleRemove=async(user1)=>{
    if(selectedChat.groupAdmin._id!==user._id&&user1._id!==user._id){
      toast.error("Only Group Admin can remove someone")
      return
    }
    try{
      setLoading(true)

      const config={
        headers:{
          Authorization:`Bearer ${user.JWT_TOKEN}`
        }
      }

      const {data}= await axios.put("/api/chat/groupRemove",{
        chatId:selectedChat._id,
        userId:user1._id
      },config)
      user1._id===user._id?setSelectedChat():setSelectedChat(data)
      setFetchAgain(!fetchAgain)
      fetchMessages()
      setLoading(false)
    }
    catch(error){
      toast.error(`Error= ${error.message}`)
      console.log(error)
    }
  }
  const handleRename=async()=>{
    if(!groupChatName) return

    try{
      setRenameLoading(true)
      const config={
        headers:{
          Authorization:`Bearer ${user.JWT_TOKEN}`
        }
      }

      const {data}= await axios.put("/api/chat/rename",{
        chatId:selectedChat._id,
        chatName:groupChatName
      },config)

      setSelectedChat(data)
      setFetchAgain(!fetchAgain)
      setRenameLoading(false)
    }
    catch(error){
      toast.error(`Error= ${error.message}`)
      console.log(error)
      setRenameLoading(false)
    }
    setGroupChatName("")
  }
  const handleAddUser=async(user1)=>{
    if(selectedChat.users.find((u)=>u._id===user1._id)){
      toast.error("User is already in the Group")
      return
    }
    if(selectedChat.groupAdmin._id!==user._id){
      toast.error("Only Group Admin can manage Users in a Group")
      return
    }
    try{
      setLoading(true)
      const config={
        headers:{
          Authorization:`Bearer ${user.JWT_TOKEN}`
        }
      }

      const {data}= await axios.put("/api/chat/groupAdd",{
        chatId:selectedChat._id,
        userId:user1._id
      },config)

      setSelectedChat(data)
      setFetchAgain(!fetchAgain)
      setLoading(false)
    }
    catch(error){
      toast.error(`Error= ${error.message}`)
      console.log(error)
    }
  }
  const filteredUsers= searchResult.filter((searchUser)=>selectedChat.users.some((u)=>u._id===searchUser._id))
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button ml={690} borderRadius={"lg"} bg="grey">
            <i className="fa-solid fa-eye"></i>
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop/>
          <Dialog.Positioner>
            <Dialog.Content bg="white" fontSize={"2xl"}>
              <Dialog.Header>
                {selectedChat.chatName}
              </Dialog.Header>
              <Dialog.Body>
                <Box w="100%" display="flex" pb={3} flexWrap="wrap">
                  {selectedChat.users.map((u)=>(
                    <UserBadge
                      key={u._id}
                      user={u}
                      handleFunction={()=>handleRemove(u)}
                    ></UserBadge>
                  ))}
                  <Box mt={2} display={"flex"} justifyContent={"space-between"} width="100%">
                    <Input placeholder='Update Group Chat Name' value={groupChatName} mr={2} width="100%" onChange={(e)=>setGroupChatName(e.target.value)} fontSize={"lg"} flex="1" pr={2}></Input>
                    <Button bg="#33d468" borderRadius={"lg"} fontSize={"lg"} color="white" onClick={handleRename} >Update</Button>  
                  </Box>                  
                  <Input placeholder='Search User to add in Group' mt="6px" fontSize={"lg"} onChange={(e)=>handleSearch(e.target.value)}></Input>
                  {loading?(<ChatLoading/>):(
                    filteredUsers.slice(0,4).map((user)=>(
                      <UserListItem
                        user={user}
                        key={user._id}
                        handleFunction={()=>handleAddUser(user)}
                      >
                      </UserListItem>
                    ))
                  )}
                  <Button bg="red" color="white" fontSize={"lg"} mt={2} onClick={()=>handleRemove(user)} borderRadius={"lg"}>Leave Group</Button>
                </Box>
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" color="black" borderRadius={"lg"} _hover={{color:"white",bg:"red"}}></CloseButton>
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
      <ToastContainer/>
    </>
  )
}

export default UpdateGroupChatModal