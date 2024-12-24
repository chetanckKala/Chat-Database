const exp = require("constants")
const express = require("express")
const app = express()
const port = 8080
const mongoose = require("mongoose")
const path = require("path")
const methodOverride = require("method-override")
const Chat = require("./models/chat.js")


// Connect to MongoDB
async function main() { await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp") }
main().then(()=> {console.log(">>> mongodb connection secured")})


// port activation
app.listen(port, ()=> {console.log(">>> server activated on", port)})


// set ejs, views, public, data format, and method override
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride("_method"))



// ------------------------------------------------------------------------





app.get("/", (req, res)=>
{
    Chat.find({})
        .then((result)=> {
            console.log(result.length)
            res.send(result)
        })
        .catch((err)=> {res.send("error occured")})

})



app.get("/chats", async (req, res)=>
{
    const result = await Chat.find({})
    console.log(">>> index route loaded")
    res.render("chats.ejs", {result})
        
})



app.get("/chats/new", (req, res)=>
{
    res.render("new.ejs")
})



app.post("/chats", (req, res)=>
{
    const new_chat = new Chat(req.body)
    new_chat.save()
                .then((res)=> {console.log(res)})
                .catch((err)=> {console.log(err)})
    res.redirect("/chats")
})



app.get("/chats/:id", async (req, res)=>
{
    const chat = await Chat.findById(req.params.id)
    // console.log(chat)
    res.render("edit.ejs", {chat})
})



app.patch("/chats/:id", async (req, res)=>
{
    const new_msg = req.body.message
    const result = await Chat.findByIdAndUpdate(req.params.id, {message: new_msg}, {new: true, runValidators: true})

    console.log(result)
    res.redirect("/chats")
})

app.delete("/chats/:id", async (req, res)=>
{
    const result = await Chat.findByIdAndDelete(req.params.id)
    console.log(result)
    res.redirect("/chats")
})