import express from "express";
import { todoSchema } from "../../zod_validators/todo.validator.js";
import { Todo } from "../../db.js";
import { validate } from "../../middleware/validate.js";
const router = express.Router();




router.post("/todo", validate(todoSchema), async function (req, res) {
    const { title, description, userID } = req.body;
    const todo = await Todo.create({
        title,
        description,
        userID
    })
    res.json({
        message: "todo created",
        todo
    })

})
router.get("/todo/:userID", async function (req, res) {
    try {
        const { userID } = req.params;
        const list = await Todo.find({ userID })
        res.json({
            msg: " here is your list of todos",
            list
        })
    } catch (error) {
        res.json({ msg: "internal server error" })
    }


})
router.put("/todo", async function (req, res) {
    const { todoId } = req.body;
    const result = await Todo.findByIdAndUpdate(todoId, { done: true }, { new: true })
    res.json({
        message: "todo is completed",
        result
    })
});



router.delete("/todo/:id", async function (req, res) {
    
    const { userID } = req.params;
    // deleteOne return 2 things 1st one is acknowledged then deletecount 
    const response = await Todo.deleteOne({
        
        userID: userID
    })
    if (response.deletedCount == 0) {

        return res.json({ msg: "todo not found" })
    }
    res.json({ msg: "todo deleted succesfully " })

})


export default router;