import { Box,Button, Text,Flex,CloseButton, Menu, Avatar, Drawer, Input, Spinner} from '@chakra-ui/react'
import { Tooltip } from '../ui/tooltip'
import React, { useEffect } from 'react'
import {useState} from "react"
import { BsMenuButton } from 'react-icons/bs'
import { chatState } from '../../context/chatContext'
import { Portal } from '@chakra-ui/react'
import "../../css/sideDrawer.css"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Theme } from '@chakra-ui/react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ChatLoading from './ChatLoading'
import axios from 'axios'
import UserListItem from '../userAvatar/UserListItem'
import { useDisclosure } from '@chakra-ui/react'

const SideDrawer = () =>{ 
  const[search,setSearch]= useState("")
  const[searchResult,setSearchResult]= useState([])
  const[loading,setLoading]= useState(false)
  const[chatLoading,setChatLoading]= useState()
  const {user,chats,setChats,selectedChat,setSelectedChat}= chatState()
  const history=useHistory()
  const{onClose}= useDisclosure()
  const logout=()=>{
    localStorage.removeItem("userInfo")
    history.push("/")
  }
  const[openDrawer,setOpenDrawer]= useState(false)
  const handleSearch=async()=>{
    if(search===""){
      toast.error("Empty Search Field")
      return
    }
    try{
      setLoading(true)
      const config={
        headers:{
          Authorization: `Bearer ${user.JWT_TOKEN}`
        }
      }

      const {data}= await axios.get(`/api/user?search=${search}`,config)
      console.log(data)
      setLoading(false)
      setSearchResult(data)
    }
    catch(error){
      toast.error(`Error= ${error.message}`)
      console.log(error)
      console.log(error.message)
    }
  }
  const accessChats=async(userId)=>{
    try{
      const config={
        headers:{
          "content-type":"application/json",
          Authorization:`Bearer ${user.JWT_TOKEN}`
        }
      }

      const {data}= await axios.post("/api/chat",{userId},config)

      if(!chats.find((c)=> c._id===data._id)) setChats([data,...chats])
      setChatLoading(false)
      setSelectedChat(data)
      onClose()
    }
    catch(error){
      toast.error(`Error= ${error.message}`)
      console.log(error)
    }
  }
  
  return (
    <>
      <Box 
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      w="100%"
      p="5px 10px 5px 10px"
      borderWidth="5px"
      >
        <Tooltip content="Search user to chat" showArrow placement="bottom-end" openDelay={300} closeDelay={100} >
          <Button borderColor="black" borderRadius="5px" borderWidth="2px" variant="ghost" d="flex" alignItems="center" gap="2" onClick={()=>setOpenDrawer(true)}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <Text display={{base:"none",md:"flex"}} alignItems="center" p="10px">Search User</Text>
          </Button>
        </Tooltip>
        <Text display="flex" fontSize="2xl" font="Work Sans">Walkie-Talkie</Text>
        <div id="icon" style={{marginRight:"2px"}}>
          <i className="fa-solid fa-bell fa-2x" style={{marginRight:"2px"}}></i>
          <Menu.Root p="2px">
            <Avatar.Root>
              <Avatar.Fallback name={user.name}></Avatar.Fallback>
            </Avatar.Root>
            <Menu.Trigger asChild>
                <Button borderRadius="5px" size="xs"><i className="fa-solid fa-angle-down"></i></Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="profile">My Profile</Menu.Item>
                    <Menu.Item value="Logout" onClick={logout}>Logout</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
          </Menu.Root>
        </div>
      </Box>
      <Theme appearance='light'>
        <Drawer.Root placement="left" open={openDrawer} onOpenChange={(e)=>setOpenDrawer(e.open)}>
          <Portal>
            <Drawer.Backdrop/>
            <Drawer.Positioner>
              <Drawer.Content bg="white">
                <Drawer.Header>
                  <Drawer.Title borderBottomWidth={1} pb={2}>
                    Search User
                  </Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                  <Box display="flex" pdb={2}>
                    <Input
                      placeholder='Search User by name or email'
                      value={search}
                      onChange={(e)=>setSearch(e.target.value)}
                      mr={2}
                    >
                    </Input>
                    <Button id="go-btn" onClick={handleSearch} borderRadius={4}>
                      Go
                    </Button>
                  </Box>
                  {loading?(<ChatLoading/>):(
                    searchResult?.map((user)=>(
                      <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={()=>accessChats(user._id)}>

                      </UserListItem>
                    ))
                  )}
                  {chatLoading&&<Spinner color="blue.500" width="4px"></Spinner>}
                </Drawer.Body>
                <Drawer.CloseTrigger asChild>
                  <CloseButton size="sm"></CloseButton>
                </Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      </Theme>
      <ToastContainer/>
    </>
  )
}

export default SideDrawer