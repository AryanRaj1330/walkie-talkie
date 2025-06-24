import React from 'react'
import { chatState } from '../context/chatContext'
import { Box, Center, Text} from '@chakra-ui/react'
import UpdateGroupChatModal from './userAvatar/UpdateGroupChatModal'
import {getSender, getSenderFull} from '../config/chatLogic'
import ProfileModal from './miscellaneous/profileModal'

const singleChat = ({fetchAgain,setFetchAgain}) => {
    const {user,selectedChat,setSelectedChat}= chatState()
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
              <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>            
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
          
        </Box>
        </>
      ):(
        <Box display="flex" alignItems="center" justifyContent="center" height="100%">
          <Text fontSize="2xl" pb={3} style={{fontFamily:"Arial"}}>
            Click on a User to start chatting
          </Text>
        </Box>
      )}
    </>
  )
}

export default singleChat