import { Dialog, Portal, Input, Button, Flex ,Box} from '@chakra-ui/react'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { CloseButton } from '@chakra-ui/react'
import { chatState } from '../../context/chatContext'
import axios from 'axios'
import ChatLoading from './ChatLoading'
import UserListItem from '../userAvatar/UserListItem'
import UserBadge from '../userAvatar/UserBadge'
import { useDisclosure } from '@chakra-ui/react'


const GroupChatModal = ({open,setOpen}) => {
    const[groupChatName,setGroupChatName]= useState("")
    const[searchedResult,setSearchedResult]= useState([])
    const[selectedUsers,setSelectedUsers]= useState([])
    const[search,setSearch]= useState("")
    const[loading,setLoading]= useState(false)
    const {onClose}= useDisclosure()
    const {user,chats,setChats}= chatState()
    const handleSearch=async(query)=>{
        setSearch(query)
        if(!query){
            throw new Error(`Empty query`)
            return
        }
        try{
            setLoading(true)

            const config={
                headers:{
                    Authorization:`Bearer ${user.JWT_TOKEN}`
                }
            }
            const {data}= await axios(`/api/user?search=${search}`,config)
            setSearchedResult(data)
            console.log(data)
            setLoading(false)
        }   
        catch(error){
            toast.error(`Error= ${error.message}`)
            console.log(error)
        }
    }
    const handleSubmit=async()=>{
      if(!groupChatName){
        toast.error("Group name is empty")
        return
      }
      if(selectedUsers.length<2){
        toast.error("Atleast 3 users are required to create a Group Chat")
        return 
      }

      try{
        const config={
          headers:{
            Authorization:`Bearer ${user.JWT_TOKEN}`
          }
        }

        const {data}= await axios.post("/api/chat/group",{
          name:groupChatName,
          users: JSON.stringify(selectedUsers.map((u)=>u._id))
        },config)

        setChats([data,...chats])
        setOpen(false)
        onClose()
      }
      catch(error){
        toast.error(`Error= ${error.message}`)
        console.log(error)
      }
    }
    const handleGroup=(user)=>{
      if(selectedUsers.some((u)=>u._id===user._id)){
        toast.error("User is already added")
        return
      }
      setSelectedUsers([...selectedUsers,user])
    }
    const handleDelete=(user)=>{
      setSelectedUsers(selectedUsers.filter((u)=>u._id!==user._id))
    }
  return (
    <>
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Portal>
                <Dialog.Backdrop/>
                <Dialog.Positioner>
                    <Dialog.Content bg="white">
                        <Dialog.Header display="flex" justifyContent={"space-between"}>
                            <Dialog.Title
                            font="sans-serif"
                            display="flex"
                            fontSize="35px"
                            justifyContent="center"
                            >Create Group Chat</Dialog.Title>
                            <CloseButton onClick={()=>setOpen(false)} borderRadius={4} bg="white" color="black" _hover={{bg:"red",color:"white"}} size="sm"/>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Input mb={3} onChange={(e)=>setGroupChatName(e.target.value)} value={groupChatName} bg="white" placeholder='Enter the Group name' variant="subtle"
                            borderWidth={1} borderColor="black" color="black"
                            ></Input>
                            <Input placeholder='Search for user' onChange={(e)=>handleSearch(e.target.value)}></Input>
                            <Box display="flex" flexWrap="wrap" gap={2} mt={2} color="white">
                                {selectedUsers.map((u)=>(
                                    <UserBadge
                                      key={u._id}
                                      user={u}
                                      handleFunction={()=>handleDelete(u)} 
                                    >
                                    </UserBadge>
                                ))}
                            </Box>
                            {loading?(<ChatLoading/>):(
                                searchedResult.slice(0,4).map((user)=>(<UserListItem
                                key={user._id}
                                user={user}
                                handleFunction={()=>handleGroup(user)}
                                />))
                            )}
                        </Dialog.Body>
                        <Dialog.Footer display="flex" justifyContent="center">
                            <Button bg="green.500" borderRadius={4} onClick={handleSubmit}>
                                Create Chat
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    </>
  )
}

export default GroupChatModal