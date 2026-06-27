import jwt from "jsonwebtoken"
export function jwtToken(user){
const token = jwt.sign({
    userID:user._id
},
process.env.JWT_SECRET)
res.json({
    message : token
})

}