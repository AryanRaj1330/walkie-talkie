import token from "jsonwebtoken"

const generateToken=(id)=>{
    return token.sign({id},process.env.JWT_SECRET,{
        expiresIn:"30d"
    })
}

export default generateToken