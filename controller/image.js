const router = require("express").Router();
const bcrypt = require("bcrypt");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: "selfcom",
	api_key: "244111242616289",
	api_secret: "WRHW8M9u8pLxq-2ylJUxWK11hpM"
  });

module.exports = {
    uploadImage(req,res){
		console.log('=========================',req)
        var file = req.files.imageupload;
	console.log("req.files",req.files);
	cloudinary.uploader.upload(file.tempFilePath,(err,res2)=>{
	   res.send({image: res2.url});
	});
    }
}
