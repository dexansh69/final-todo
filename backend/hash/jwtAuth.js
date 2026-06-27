import jwt from "jsonwebtoken"
export function generatetoken (userId){
 const token=   jwt.sign({
    id:userId
},process.env.JWT_SECRET)
return token;
}