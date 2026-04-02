const musicmodel = require("../model/music.model");
const { uploadfile } = require("../services/storage");
const jwt = require("jsonwebtoken");
async function musiccreate(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      massage: "unauthorize",
    });
  }
 
    const decode = jwt.verify(token, process.env.JWT_S);

    if (decode.role !== "artist") {
      return res.status(403).json({
        massage: "you can not create music",
      });
    }

const { title } = req.body;
    const file = req.file;
    console.log(file);
    

    const response = await  uploadfile(file.buffer.toString("base64"));

    const music = await musicmodel.create({
      url: response.url,
      title: title,
      artist: decode.id,
    });

    res.status(200).json({
      massage: "music created",
      music: {
        id: music._id,
        url: music.url,
        title: music.title,
        artist: music.artist,
      },
    });

   
  }


module.exports = { musiccreate };
