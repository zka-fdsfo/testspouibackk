const express=require("express")
const musiccontrol=require("../controllers/music.controller")
const multer  = require('multer')
const router=express.Router()
const upload=multer({
    storage:multer.memoryStorage()
})

router.post("/createmusic",upload.single("music") ,musiccontrol.musiccreate)

module.exports=router