import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { chatState } from '../context/chatContext'
import { isLast, isSameSender,isSameSenderMargin,isSameUser } from '../config/chatLogic'
import { Tooltip } from './ui/tooltip'
import { Avatar } from '@chakra-ui/react'

// very important component 

const ScrollableChats = ({messages}) => {
  const {user}= chatState()
  return (
    <>
      <ScrollableFeed>
        {messages&&
          messages.map((m,i)=>(
            <div style={{display:"flex"}} key={m._id}>
              {(isSameSender(messages,m,i,user._id))||
                isLast(messages,i,user._id)&&(
                  <>
                    <Tooltip
                      content={m.sender.name}
                      placement="bottom-end"
                      showArrow
                      openDelay={300} closeDelay={100}
                    >
                      <Avatar.Root 
                        mt={7}
                        mr={1}
                        size="sm"
                        cursor="pointer"

                      >
                        <Avatar.Fallback name={m.sender.name}/>
                      </Avatar.Root>
                    </Tooltip>
                  </>
                )
              }
              <span style={{
                backgroundColor:`${m.sender._id===user._id? "#BEE3F8": "#B9F5D0"}`,
                borderRadius:"20px",
                padding:"5px 15px",
                maxWidth:"75%",
                marginLeft:isSameSenderMargin(messages,m,i,user._id),
                marginTop:isSameUser(messages,m,i)?3:10
              }}>{m.content}</span>
            </div>
          ))
        }
      </ScrollableFeed>
    </>
  )
}

export default ScrollableChats