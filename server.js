const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

tasks = [
    {id: 1, title: "Task 1", done: false},
    {id: 2, title: "Task 2", done: true},
    {id: 3, title: "Task 3", done: false}
];


app.get("/", (req,res) => {
    res.send("hello this is abdul Rehman")
});

app.get("/", (req, res) => {
    res.json({"name": "Task API", "version": "1.0", "endpoints": ["/tasks"]});
});


app.get("/health", (req, res) => {
    
    res.status(200).json({"status": "OK"});
});

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        return res.status(404).json({"error": "Task  99 not found"});
    }
    res.json(task);
});

app.post("/tasks", (req, res) => {
    const { title} = req.body;
    if (!title || title.trim() === "" ) {
        return res.status(400).json({"error": "Title is required"});
    }
    const newTask = {
        id: tasks.length + 1,
        title: title,
        done: false
    };
    tasks.push(newTask);
    console.log("New task added:", newTask);
    console.log(tasks);
    res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        return res.status(404).json({"error": "Task not found"});
    }
    const { title } = req.body;
    if (!title || title.trim() === "") {
        return res.status(400).json({"error": "Title is required"});
    }
    task.title = title;
    console.log(tasks);
    res.json(task);
});

app.delete("/test", (req, res) => {
    res.send("DELETE works!");
});

app.delete("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({"error": "Task not found"});
    }
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    console.log("Task deleted:", deletedTask);
    res.json(deletedTask);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});