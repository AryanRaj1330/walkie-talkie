import React from 'react'
import { Avatar, Button, CloseButton, Dialog, Portal, Text, useDisclosure } from '@chakra-ui/react'

const ProfileModal = ({user,handleFunction,handleFunction2}) => {
  const {onClose,onOpen,isOpen}= useDisclosure()
  
  return (
    <>
 {/* isOpen={isOpen} onClose={onClose} */}
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button borderRadius="sm" bg="grey" borderWidth="2px"  borderSize pr={2} pl={2}>
            <i className="fa-solid fa-eye"></i>
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop/>
          <Dialog.Positioner>
            <Dialog.Content bg="white">
              <Dialog.Header display="flex" justifyContent="center">
                {handleFunction}
              </Dialog.Header>
              <Dialog.Body display="flex" justifyContent="center" alignItems="center" flexDir="column">
                {/* {handleFunction2()} */}
                <Avatar.Root mb={4}>
                  <Avatar.Fallback name={handleFunction2.name} ></Avatar.Fallback>
                </Avatar.Root>
                <Text>Name: {handleFunction2.name}</Text>
                <Text>Email: {handleFunction2.email}</Text>
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton borderRadius={4} bg="black" size="sm"/>
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}

export default ProfileModal