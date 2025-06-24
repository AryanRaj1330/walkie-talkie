import asyncHandler from "express-async-handler"
import Message from "../models/messageModel.js"
import user from "../models/userModel.js"
import Chat from "../models/chatModel.js"

const sendMessage=asyncHandler(async(req,res)=>{
    const {content,chatId}= req.body

    if(!content||!chatId){
        res.status(401)
        throw new Error("Invalid data passed into request")
    }

    var newMessage={
        sender:req.user._id,
        content:content,
        chat:chatId
    }
    try{
        var message= await Message.create(newMessage)
        message= await message.populate("sender","name email") // may be pic se dikkat ho
        message= await message.populate("chat")
        message= await user.populate(message,{
            path:"chat.users",
            select:"name email"
        })
        await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMessage:message
        })
        res.json(message)
    }
    catch(error){
        res.status(401)
        console.log(error)
        throw new Error(error.message)
    }
})

const allMessages=asyncHandler(async(req,res)=>{
    try{
        const message= await Message.find({chat: req.params.chatId}).
        populate("sender","name email").
        populate("chat")
        
        res.json(message)
    }
    catch(error){
        res.status(401)
        throw new Error(error)        
    }
})

export {sendMessage,allMessages}