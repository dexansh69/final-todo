import express from "express";
import { todoSchema } from "../../zod_validators/todo.validator.js";
import { Todo } from "../../db.js";
import { validate } from "../../middleware/validate.js";
import { userAuth } from "../../middleware/jwtToken.js";
const router = express.Router();




router.post("/todo", userAuth,validate(todoSchema), async function (req, res) {
    const { title, description} = req.body;
    const userID = req.user.userId;
    const todo = await Todo.create({
        title,
        description,
        userID
    })
    res.status(200).json({
        message: "todo created",
        todo
    })

})
router.get("/todo",userAuth, async function (req, res) {
    const userID=req.user.userId;
    try {
        
        const list = await Todo.find({ userID })
        res.status(200).json({
            message: " here is your list of todos",
            list
        })
    } catch (error) {
        res.status(400).json({ message: "internal server error" })
    }


})
router.put("/todo/:id", async function (req, res) {
    const { id } = req.params;
    const result = await Todo.findByIdAndUpdate(id, { done: true }, { new: true })
    res.json({
        message: "todo is completed",
        result
    })
});



router.delete("/todo/:id", async function (req, res) {
    
    const { id } = req.params;
    // deleteOne return 2 things 1st one is acknowledged then deletecount 
    const response = await Todo.deleteOne({
        
        _id: id
    })
    if (response.deletedCount == 0) {

        return res.status(400).json({ message: "todo not found" })
    }
    res.status(200).json({ message: "todo deleted succesfully " })

})


export default router;