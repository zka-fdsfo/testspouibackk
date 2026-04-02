require("dotenv").config()
const app=require("./src/app")
const port=3000
const ConDB=require("./src/db/db")
const dns = require('dns');

// Use Google DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);
ConDB()
app.listen(port,()=>{
    console.log(`Server Running on port 🚀 ${port}\n`);
})