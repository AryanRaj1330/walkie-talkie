import React from 'react'
import axios from "axios"
import { useEffect,useState } from 'react'
import { Button } from '@chakra-ui/react'

const ChatPage = () => {
const[count,setCount]=useState(0)
  return (
    <>
      <div> Welcome to the Chat Page</div>
      <div>
        <Button onClick={()=>setCount(prev=>prev+1)}>
          Counter {count}
        </Button>
      </div>
    </>
  )
}

export default ChatPage