import { Avatar, CloseButton, Dialog, Portal, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { chatState } from '../../context/chatContext'

const ProfileDialogUser = ({open,setOpen}) => {
    const {user}=chatState()
    useEffect(()=>{
        console.log("running")
    },[])
  return (
    <>
    <Dialog.Root open={open} onOpenChange={setOpen}>
        <Portal>
            <Dialog.Backdrop/>
            <Dialog.Positioner>
                <Dialog.Content bg="white">
                    <Dialog.Header display="flex" justifyContent={"center"} position={"relative"}>
                        <Dialog.Title>{user.name}</Dialog.Title>
                        <CloseButton position={"absolute"} right="5" onClick={()=>setOpen(false)} borderRadius={4} bg="white" color="black" _hover={{bg:"red",color:"white"}} size="sm"/>
                    </Dialog.Header>
                    <Dialog.Body display="flex" flexDir={"column"} alignItems={"center"} gap={4}>
                        <Avatar.Root>
                            <Avatar.Fallback name={user.name}></Avatar.Fallback>
                        </Avatar.Root>
                        <Text>Name: {user.name}</Text>
                        <Text>Email: {user.email}</Text>
                    </Dialog.Body>
                </Dialog.Content>
            </Dialog.Positioner>
        </Portal>
    </Dialog.Root>
    </>
  )
}

export default ProfileDialogUser