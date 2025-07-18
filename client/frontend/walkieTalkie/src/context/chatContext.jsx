import { createContext,useContext,useState,useEffect } from "react"
import { useHistory } from "react-router-dom"

const chatContext= createContext()

const ChatProvider=({children})=>{
    const history=useHistory()
    const[user,setUser]= useState()
    const[selectedChat,setSelectedChat]= useState()
    const[chats,setChats]= useState([])
    const[notifications,setNotifications]= useState([])

    useEffect(()=>{
        const userInfo= JSON.parse(localStorage.getItem("userInfo"))
        setUser(userInfo)

        if(!userInfo) history.push("/")
    },[history])

    return(
        <chatContext.Provider value={{user,setUser,selectedChat,setSelectedChat,chats,setChats,notifications,setNotifications}}>{children}</chatContext.Provider>
    )
}

export const chatState=()=>{
    return useContext(chatContext)
}

export default ChatProvider