import React from 'react'
import { Button, CloseButton, Dialog, Portal, useDisclosure } from '@chakra-ui/react'

const ProfileModal = ({user,handleFunction,handleFunction2}) => {
  const {onClose,onOpen,isOpen}= useDisclosure()
  
  return (
    <>
      <Button borderRadius="sm" borderWidth="2px" borderColor="black" borderSize pr={2} pl={2} onClick={onOpen}>
        <i className="fa-solid fa-eye"></i>
      </Button>

      <Dialog.Root isOpen={isOpen} onClose={onClose}>
        <Portal>
          <Dialog.Backdrop/>
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                {handleFunction}
              </Dialog.Header>
              <Dialog.Body>
                {handleFunction2}
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