import express from "express";
import {
    createTodo,
    deleteTodo,
    getTodos,
    updateTodo,
} from "../controller/todoController.js";

const router = express.Router();

// Routes define 

// 1.Create Todo
router.post("/create", createTodo);

// 2.Get Todos
router.get("/fetch", getTodos);

// 3.Update Todo
router.put("/update/:id", updateTodo);

// 4.Delete Todo
router.delete("/delete/:id", deleteTodo);

export default router;