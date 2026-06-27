import {z} from "zod";
export const user = z.object({
    username : z.string().min(3),
    email : z.string().min(1),
    password : z.string().min(5)
})