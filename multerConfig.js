var multer = require('multer');
var path = require('path');
var fs = require('fs');

exports.storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (!fs.existsSync(path.resolve('uploads/image'))) {
            fs.mkdirSync(path.resolve('uploads/image'));
        }
        callback(null, path.resolve('uploads/image'));
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname.toString());
    }
}); 
