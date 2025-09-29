import Todo from "../model/todoModel.js";
// frontend se data fetch karega
export const createTodo = async (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        completed: req.body.completed
    });
    try {
        const newTodo = await todo.save();
        res.status(201).json({ message: "✅ Todo Created Succussfully", newTodo });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "❌ Error occuring in todo creation"
        });
    }
};

// All todos fetch karega 
export const getTodos = async (req, res) => {
    try {
        // const todos = await Todo.find({ user: req.user._id });
        const todos = await Todo.find();
        res.status(200).json({ message: "✅ Todo Fetched Successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "❌ Error occuring in todo fetching", todos });
    }
};

// Todo Update karega

export const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json({ message: "✅ Todo Updated Successfully", todo })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "❌ Error occuring in todo updating" });
    }
};

// Todo Delete karne ke lie

export const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ message: "✅ Todo Deleted Succussfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "❌ Error occuring in todo Deleting" });
    }
}