const multer = require('multer');

const fileFilter = (req, file, cb) =>{
    cb(null , true);
}

const fileUpload = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now()+ '_' + file.originalname)
    }
})

exports.FileRead = multer({storage: fileUpload,fileFilter: fileFilter});