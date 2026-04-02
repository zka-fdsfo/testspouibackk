const ImageKit=require("@imagekit/nodejs")

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});
async function  uploadfile(file){
const response = await client.files.upload({
    file,
  fileName: 'file-name.jpg'+Date.now(),
  folder:"sp-music"
});
return response;
} 

module.exports={ uploadfile}
