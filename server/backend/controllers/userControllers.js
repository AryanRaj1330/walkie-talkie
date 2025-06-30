import asyncHandler from "express-async-handler"
import user from "../models/userModel.js"
import generateToken from "../config/generateToken.js"

const registerUser= asyncHandler(async(req,res)=>{
    const {name,email,password}= req.body
    if(!name||!email||!password){
        res.status(400)
        throw new Error("Please enter all the required fields")
    }

    const userExists= await user.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error("User is already registered")
    }

    const userData= await user.create({ // since key and value has same name so it is a shorthand to just write name insteade of name:name
        name,
        email,
        password
    })
    if(userData){
        res.status(201).json({
            _id:userData._id,
            name:userData.name,
            email:userData.email,
            JWT_TOKEN:generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error("Failed to create the user")
    }
})

const authUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        res.status(400)
        throw new Error("Please enter all the required fields")
    }

    const userPerson= await user.findOne({email})
    if(userPerson&&(await userPerson.matchPassword(password))){
       res.status(201).json({
        _id:userPerson._id,
        name:userPerson.name,
        email:userPerson.email,
        JWT_TOKEN:generateToken(userPerson._id)
       })
    }
    else{
        res.status(400)
        throw new Error("Invalid username or password")
    }
})

// /api/user?search=aryan this is a query we can use this instead of post request
const allUsers=asyncHandler(async(req,res)=>{
    const keyword= req.query.search
    ?{
        $or:[
            {name:{$regex: req.query.search, $options:"i"}},
            {email:{$regex:req.query.search,$options:"i"}}
        ]
    }:{}
    const userData= await user.find(keyword).find({_id:{$ne:req.user._id}}) 
    if(userData.length===0){
        res.status(404)
        throw new Error("No user found")
    }
    else res.send(userData)
})

export {registerUser,authUser,allUsers}