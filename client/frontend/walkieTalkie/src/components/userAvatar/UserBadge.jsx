import { Badge, CloseButton } from '@chakra-ui/react'
import React from 'react'

const UserBadge = ({user,handleFunction}) => {
  return (
    <>
       <Badge style={{backgroundColor:"#7113b0"}} paddingRight={1} paddingLeft={3}
       color="white" borderRadius={6}
       >{user.name}<CloseButton size="sm" onClick={handleFunction}/></Badge>
    </>
  )
}

export default UserBadge