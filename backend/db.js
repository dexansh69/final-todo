
import { MongoGCPError, ObjectId } from "mongodb";
import mongoose from "mongoose";
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log(err);
    });

const TodoSchema = mongoose.Schema({

    title: String,
    description: String,
    
    done: {
        type: Boolean,
        default: false
    },
    userID: ObjectId
})
const UserSchema = mongoose.Schema({
    username:String,
    email : String,
    
    password : String
})
const User = mongoose.model("users",UserSchema);
const Todo = mongoose.model("todos", TodoSchema);
export {Todo,User}
