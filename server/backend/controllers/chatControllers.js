import asyncHandler from "express-async-handler"
import chat from "../models/chatModel.js"
import user from "../models/userModel.js"

const accessChats=asyncHandler(async(req,res)=>{
    const {userId}= req.body
    if(!userId){
        res.status(401)
        throw new Error("User Id param not sent with request")
        return
    }

    var isChat= await chat.find({
        isGroupChat:false, 
        $and:[
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$eq:userId}}}
        ]
    }).
    populate("users","-password").
    populate("latestMessage")
    
    isChat= await user.populate(isChat,{
        path:"latestMessage.sender",
        select:"name email"
    })
    if(isChat.length>0){
        res.send(isChat[0])
    }
    else{
        var chatData={
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id,userId]
        }
        
        try{
            const createdChat= await chat.create(chatData)
            const fullChat= await chat.findOne({_id:createdChat._id}).populate("users","-password")

            res.status(200).send(fullChat)
        }
        catch(error){
            res.status(400)
            throw new Error(`Error= ${error.message}`)
        }
    }
})

export {accessChats}