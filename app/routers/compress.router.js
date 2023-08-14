var { storage } = require('../../multerConfig');
const { admin } = require("../middleware/roles");
const auth = require("../middleware/auth");
var multer = require('multer');

const upload = multer({ storage: storage });

module.exports = app => {
    const compress = require("../controllers/compress.controler");
    var router = require("express").Router();

    router.post("/", [auth, admin], upload.single('file'), compress.create);

    // Retrieve all compre
    app.use('/api/compress', router);
};