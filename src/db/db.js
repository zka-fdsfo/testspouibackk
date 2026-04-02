const mongoose=require("mongoose")

async function connectdb() {
    try {
        await mongoose.connect(process.env.MONG_URL)
         console.log("connected to 🔌 db 🎊");
    } catch (error) {
        console.log("There an Error Fix It 🛠");
        console.log(error);
        
    }
}

module.exports=connectdb