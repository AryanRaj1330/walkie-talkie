import asyncHandler from "express-async-handler"
import chat from "../models/chatModel.js"
import user from "../models/userModel.js"

const accessChats=asyncHandler(async(req,res)=>{
    const {userId}= req.body
    if(!userId){
        res.status(401)
        throw new Error("User Id param not sent with request")
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

const fetchChats=asyncHandler(async(req,res)=>{
    try{
        chat.find({users:{$elemMatch:{$eq:req.user._id}}}).
        populate("users","-password").
        populate("groupAdmin","-password").
        populate("latestMessage").
        sort({updatedAt:-1}).
        then(async(results)=>{
            results= await user.populate(results,{
                path:"latestMessage.sender",
                select:"name email"
            })
            res.status(201).send(results)
        })
    }
    catch(error){
        res.status(401)
        throw new Error(`Error=${error.message}`)
    }
})  

const createGroup=asyncHandler(async(req,res)=>{
    if(!req.body.users||!req.body.name){
        res.status(400).send({message:"Please Fill all the fields"})
    }

    var users= JSON.parse(req.body.users)

    if(users.length<2){
        res.status(400)
        throw new Error("Minimum 3 people are required to create a group chat")
    }

    users.push(req.user)

    try{
        const groupChat= await chat.create({
            chatName:req.body.name, // ye jo name hai vo group name hai isiliye upar if me agar grp name nahi hai to throw error,
            users: users,
            isGroupChat:true,
            groupAdmin: req.user
        })

        const fullGroupChat= await chat.findOne({_id:groupChat._id}).
        populate("users","-password").
        populate("groupAdmin","-password")

        res.status(201).json(fullGroupChat)
    }
    catch(error){
        res.status(400)
        throw new Error(`Error=${error.message}`)
    }
})

const renameGroup= asyncHandler(async(req,res)=>{
    const {chatId, chatName}= req.body

    const updatedChat= await chat.findByIdAndUpdate(
        chatId,
        {
            chatName
        },
        {
            new:true
        }
    ).
    populate("users","-password").
    populate("groupAdmin","-password")

    if(!updatedChat){
        res.status(400)
        throw new Error("Chat not found")
    }
    else res.json(updatedChat)
})

const addToGroup=asyncHandler(async(req,res)=>{
    const {chatId,userId}= req.body

    const added= await chat.findByIdAndUpdate(
        chatId,
        {
            $push:{users:userId}
        },
        {
            new:true
        }
    ).
    populate("users","-password").
    populate("groupAdmin","-password")

    if(!added){
        res.status(400)
        throw new Error("New user NOT added in the group")
    }
    else res.json(added)
})

const removeFromGroup=asyncHandler(async(req,res)=>{
    const {chatId, userId}= req.body

    const remove= await chat.findByIdAndUpdate(
        chatId,
        {
            $pull:{users:userId}
        },
        {
            new:true
        }
    ).
    populate("users","-password").
    populate("groupAdmin","-password")

    if(!remove){
        res.status(400)
        throw new Error("User not removed")
    }
    else res.json(remove)
})

export {accessChats,fetchChats, createGroup, renameGroup,addToGroup,removeFromGroup}

