const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const Todo =require("./models/todoModels")
// const dotenv = require("dotenv")
// const connectDB = require("./db")
// const todoRoutes = require("./routes/todoRoutes")
// const path = require("path")
// dotenv.config()

const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
// app.use('/api', todoRoutes)

// connectDB()

// app.use(express.static(path.join(__dirname, "../todo-frontend/build")))

// app.get("*", (req, res) =>{
//     res.sendFile(path.join(__dirname, "../todo-frontend/build", "index.html"))
// })
// module.exports = app;
// app.use()
const connectDB = async()=>{
    try{
    await mongoose.connect("mongodb+srv://anil:anil2211@cluster0.cqvrpoh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("mongoDb connected")
    } catch(error){
        console.error("MongoDb connection failed", error)
    }
    
}

app.get("/get-todo", async (req,res)=>{
    console.log("Fetching the todos from the DBs")
    try {
        const todos= await Todo.find();
        console.log("fetched all the todos",todos)
        res.status(200).json(todos)
    } catch (error) {
        console.log("Error while fetching the todos",error)
        res.status(500).json({message:"something went wrong..."})
    }
})

app.post("/add-todo",async(req,res)=>{
    const title=req.body;
    // console.log("Adding a new todo",req.body)
    console.log("adding a new todo",title.todo)
    const newTodo = new Todo({
        title:title.todo
    })
    console.log("Adding the todo to DB",newTodo)
    const savedTodo = await newTodo.save()
    console.log("Added the todo to Db",savedTodo)

    res.status(200).json(savedTodo)
})

connectDB()
const PORT = 3001;
app.listen(PORT,()=>{
    console.log(`server is running on the port ${PORT}`)
})
