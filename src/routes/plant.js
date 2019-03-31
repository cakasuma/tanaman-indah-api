let PlantModel = require('../models/schema/plant.model')
let express = require('express')
let router = express.Router()
let multer = require('multer')
let path = require('path')
// set storage multer
const storage = multer.diskStorage({
    destination: './public/images/',
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

// init upload
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: function (req, file, callback) {
        checkFileType(file, callback)
    }
}).single('myImage')

// filter file type
const checkFileType = (file, callback) => {
    // allowed extension
    const fileTypes = /jpeg|jpg|png|gif/;
    // check extension
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    // check mimetype
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
        callback(null, true);
    } else {
        callback('Error: images only');
    }
}

router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        const rootDir = req.protocol + '://' + req.get('host');
        if (err) {
            res.render('index', {
                msg: err
            })
        } else {
            if (req.file === undefined) {
                res.render('index', {
                    msg: 'Error: no file selected'
                })
            } else {
                if (!Object.keys(req.body).length === 0) res.status(400).send('Request body is missing')
                const plantModel = new PlantModel({
                    name: req.body.name,
                    imagePath: `${rootDir}/images/${req.file.filename}`,
                    price: req.body.price,
                    description: req.body.description
                })
                plantModel.save()
                    .then(doc => {
                        if (!doc || doc.length === 0) res.status(500).send(doc)

                        res.status(201).send(doc)
                    })
                    .catch(err => res.status(500).json(err))
                res.render('index', {
                    msg: 'File uploaded',
                    file: `images/${req.file.filename}`
                })
            }
        }
    })
})

module.exports = router