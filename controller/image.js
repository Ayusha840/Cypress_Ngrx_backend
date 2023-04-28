const router = require("express").Router();
const bcrypt = require("bcrypt");
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
cloudinary.config({
	cloud_name: "daeijanrv",
	api_key: "935984599728916",
	api_secret: "TQS_o_zHz1sOU7wG0KAL6edoXbY"
  });

module.exports = {
    uploadImage(req,res){
        var file = req.files[0];
	console.log("req.files",req.files);
	cloudinary.uploader.upload(file.path,(err,res2)=>{
		res.send({image: res2.url});
	});
	// fs.unlink('./'+ file.destination + '/' + file.filename)
	
    }
}
