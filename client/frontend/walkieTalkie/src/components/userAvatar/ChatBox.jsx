import React from 'react'
import { chatState } from '../../context/chatContext'
import { Box } from '@chakra-ui/react'
import SingleChat from '../SingleChat'

const ChatBox = ({fetchAgain,setFetchAgain}) => {
  const {selectedChats} = chatState()

  return (
    <>
      <Box
        display={{base:selectedChats?"flex":"none",md:"flex"}}
        alignItems="center"
        flexDir="column"
        p={3}
        bg="white"
        width={{base:"100%",md:"68%"}}
        borderRadius="lg"
        borderWidth={1}
      >
        <SingleChat fecthAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>    
    </>
  )
}

export default ChatBox