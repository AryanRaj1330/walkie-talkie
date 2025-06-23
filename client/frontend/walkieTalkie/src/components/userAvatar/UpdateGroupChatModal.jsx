import { Box, Button, CloseButton, Dialog, Input, Portal } from '@chakra-ui/react'
import React, { useState } from 'react'
import { chatState } from '../../context/chatContext'
import { toast,ToastContainer } from 'react-toastify'
import { useDisclosure } from '@chakra-ui/react'
import UserBadge from './UserBadge'
import axios from 'axios'

const UpdateGroupChatModal = ({fetchAgain,setFetchAgain}) => {
  const {isOpen,onOpen,onClose}= useDisclosure()
  const[groupChatName,setGroupChatName]= useState("")
  const[search,setSearch]= useState("")
  const[searchResult,setSearchResult]= useState([])
  const[loading,setLoading]= useState(false)
  const[renameLoading,setRenameLoading]= useState(false)
  const handleRemove=(user)=>{

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
  const {selectedChat,setSelectedChat,user}= chatState()
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button borderRadius={"lg"} bg="grey">
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
                      handleFunction={handleRemove(u)}
                    ></UserBadge>
                  ))}
                  <Box mt={2} display={"flex"} justifyContent={"space-between"} width="100%">
                    <Input placeholder='Update Group Chat Name' value={groupChatName} mr={2} width="100%" onChange={(e)=>setGroupChatName(e.target.value)} fontSize={"lg"} flex="1" pr={2}></Input>
                    <Button bg="#33d468" borderRadius={"lg"} fontSize={"lg"} color="white" onClick={handleRename} >Update</Button>  
                  </Box>                  
                  <Input placeholder='Search User to add in Group' mt="6px" fontSize={"lg"}></Input>
                  <Button bg="red" color="white" fontSize={"lg"} mt={2} borderRadius={"lg"}>Leave Group</Button>
                </Box>
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" color="black" borderRadius={"lg"} _hover={{color:"white",bg:"red"}}></CloseButton>
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}

export default UpdateGroupChatModal