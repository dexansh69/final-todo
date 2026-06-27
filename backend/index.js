import "dotenv/config"
import express from "express";
import cors from "cors"
import "./db.js";
import signupRouter from"./routes/users/signup.js"
import todoRouter from "./routes/todo/crudtodo.js"

const app = express();
app.use(cors())
app.use(express.json());
//signup router
app.use("/users",signupRouter);
app.use("/todos",todoRouter)

//get 
app.get("/",function(req,res){
    res.send("server is running");
})

//port
const PORT = process.env.PORT ||3000;
app.listen(PORT,()=>{
    console.log(`serve is running on${PORT}`)
})