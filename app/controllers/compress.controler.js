var fs = require('fs');
var path = require('path');
var sharp = require('sharp');

const validations = require('../Validations/validation.compress');

exports.create = (req, res) => {
    try {
        let response = validations(req.query.quality, req.query.extension, req.query.width, req.query.height, req.file.filename);

        if (response !== undefined) {
            fs.unlinkSync(path.join(__dirname, '../../', 'uploads', 'image', req.file.filename));
            return res.json({ error: response });
        }

        if (!fs.existsSync(path.join(__dirname, '../../', 'uploads', 'compress'))) {
            fs.mkdirSync(path.join(__dirname, '../../', 'uploads', 'compress'));
        }

        let name = path.basename(req.file.filename, path.extname(req.file.filename));
        let compressedImageFileSavePath = path.join(__dirname, '../../', 'uploads', 'compress', name + req.query.extension);
        
        switch (req.query.extension) {
            case '.gif':
                sharp(req.file.path).resize(
                    req.query.width !== undefined && req.query.width !== null && req.query.width !== '' ? parseInt(req.query.width) : null,
                    req.query.height !== undefined && req.query.height !== null && req.query.height !== '' ? parseInt(req.query.height) : null
                ).gif({
                    quality: req.query.quality !== undefined && req.query.quality !== null && req.query.quality !== '' ? parseInt(req.query.quality) : 100,
                    chromaSubsampling: '4:4:4'
                }).toFile(compressedImageFileSavePath, (err, info) => {
                    if (err) {
                        res.send(err);
                    } else {
                        //return file image
                        res.download(compressedImageFileSavePath);

                        //remove directory image                 
                        fs.unlinkSync(path.join(__dirname, '../../', 'uploads', 'image', req.file.filename));
                    }
                });
                break;

            case '.tiff':
                sharp(req.file.path).resize(
                    req.query.width !== undefined && req.query.width !== null && req.query.width !== '' ? parseInt(req.query.width) : null,
                    req.query.height !== undefined && req.query.height !== null && req.query.height !== '' ? parseInt(req.query.height) : null
                ).tiff({
                    quality: req.query.quality !== undefined && req.query.quality !== null && req.query.quality !== '' ? parseInt(req.query.quality) : 100,
                    chromaSubsampling: '4:4:4'
                }).toFile(compressedImageFileSavePath, (err, info) => {
                    if (err) {
                        res.send(err);
                    } else {
                        //return file image
                        res.download(compressedImageFileSavePath);

                        //remove directory image                 
                        fs.unlinkSync(path.join(__dirname, '../../', 'uploads', 'image', req.file.filename));
                    }
                });
                break;

            case '.png':
                sharp(req.file.path).flatten({ background: '#ffffff' }).resize(
                    req.query.width !== undefined && req.query.width !== null && req.query.width !== '' ? parseInt(req.query.width) : null,
                    req.query.height !== undefined && req.query.height !== null && req.query.height !== '' ? parseInt(req.query.height) : null
                ).png({
                    quality: req.query.quality !== undefined && req.query.quality !== null && req.query.quality !== '' ? parseInt(req.query.quality) : 100,
                    chromaSubsampling: '4:4:4'
                }).toFile(compressedImageFileSavePath, (err, info) => {
                    if (err) {
                        res.send(err);
                    } else {
                        //return file image
                        res.download(compressedImageFileSavePath);

                        //remove directory image                 
                        fs.unlinkSync(path.join(__dirname, '../../', 'uploads', 'image', req.file.filename));
                    }
                });
                break;

            case '.webp':
                sharp(req.file.path).resize(
                    req.query.width !== undefined && req.query.width !== null && req.query.width !== '' ? parseInt(req.query.width) : null,
                    req.query.height !== undefined && req.query.height !== null && req.query.height !== '' ? parseInt(req.query.height) : null
                ).webp({
                    quality: req.query.quality !== undefined && req.query.quality !== null && req.query.quality !== '' ? parseInt(req.query.quality) : 100,
                    chromaSubsampling: '4:4:4'
                }).toFile(compressedImageFileSavePath, (err, info) => {
                    if (err) {
                        res.send(err);
                    } else {
                        //return file image
                        res.download(compressedImageFileSavePath);

                        //remove directory image                 
                        fs.unlinkSync(path.join(__dirname, '../../', 'uploads', 'image', req.file.filename));
                    }
                });
                break;

            default:
                sharp(req.file.path).resize(
                    req.query.width !== undefined && req.query.width !== null && req.query.width !== '' ? parseInt(req.query.width) : null,
                    req.query.height !== undefined && req.query.height !== null && req.query.height !== '' ? parseInt(req.query.height) : null
                ).jpeg({
                    quality: req.query.quality !== undefined && req.query.quality !== null && req.query.quality !== '' ? parseInt(req.query.quality) : 100,
                    chromaSubsampling: '4:4:4'
                }).toFile(compressedImageFileSavePath, (err, info) => {
                    if (err) {
                        res.send(err);
                    } else {
                        //return file image
                        res.download(compressedImageFileSavePath);

                        //remove directory image                 
                        fs.unlinkSync(path.join(__dirname, '../../', 'uploads', 'image', req.file.filename));
                    }
                });
        }
    } catch (err) {
        fs.unlinkSync(path.join(__dirname, '../../', 'uploads', 'image', req.file.filename));
        res.json({ error: `Unexpected error: ${err}` });
    }
}