import { Badge, CloseButton } from '@chakra-ui/react'
import React from 'react'

const UserBadge = ({user,handleFunction}) => {
  return (
    <>
       <Badge bg="#7113b0" paddingRight={1} paddingLeft={3}
       color="white" borderRadius={6} mr="2px" ml="2px" mb="3px"
       >{user.name}<CloseButton borderRadius={6} _hover={{bg:"red",color:"white"}} size="sm" onClick={handleFunction}/></Badge>
    </>
  )
}

export default UserBadge