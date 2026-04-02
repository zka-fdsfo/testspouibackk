const usermodle = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcryptjs")
async function registeruser(req, res) {
  const { username, email, password, role = "user" } = req.body;
  const userallredyindata = await usermodle.findOne({
    $or: [{ username: username }, { email: email }],
  });
  if (userallredyindata) {
    return res.status(409).json({
      massage: "User have allready Sign up please login ",
    });
  }

      const hash=await bcrypt.hash(password,10)
  const user = await usermodle.create({
    username,
    email,
    password:hash,
    role
  });
 


  const token=jwt.sign({
    id:user._id,
    role:user.role
  },process.env.JWT_S)

  res.cookie("token",token)

  res.status(201).json({
    massage:"you rigester successfully",
    user:{
      id:user._id,
      username:user.username,
      email:user.email,
      password:user.password,

    }
  })
}
async function login(req,res) {
  const {username, email, password}=req.body
 
      const user=await usermodle.findOne({
    $or:[{username},{email}]
  })
  if(!user){
  return res.status(401).json({
    massage:"please Sign up"
  })
}
 
  const match = await bcrypt.compare(password, user.password);

    if(!match) {
        res.status(401).json({massage:"wrong password"})
    }
 const token=jwt.sign({
    id:user._id,
    role:user.role
  },process.env.JWT_S)
  
  res.cookie("token",token)
  res.status(200).json({
      massage:"you are login  successfully"
    ,
    user:{
       id:user._id,
      username:user.username,
      email:user.email,
      password:user.password,
    }
  }
    
    )
}
module.exports = { registeruser,login };
