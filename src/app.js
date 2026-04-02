const express=require("express")

const cookies=require("cookie-parser")
const authrouts=require("./routes/auth.route")
const musicrouts=require("./routes/music.route")
const app=express()
app.use(cookies())
app.use(express.json())
try {
    app.use("/api/auth",authrouts);
    app.use("/api/music",musicrouts);
    
} catch (error) {
    console.log(error);
    
}

module.exports=app