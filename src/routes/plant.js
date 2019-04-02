let PlantModel = require('../models/schema/plant.model')
let express = require('express')
let router = express.Router()
let multer = require('multer')
let path = require('path')

// SECTION 1 REST API

//post
router.post('/plant', (req, res) => {
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
                res.render('add', {
                    msg: 'File uploaded'
                })
            }
        }
    })
})

//get
router.get('/plant', (req, res) => {
    PlantModel.find().then(doc => res.json(doc))
        .catch(err => res.status(500).json(err))
})

// get specific
router.get('/plant/:id', (req, res) => {
    if (!req.params.id) {
        res.status(400).send('Missing URL parameter id')
    }

    PlantModel.findOne({
            _id: req.params.id,
        }).then(doc => res.json(doc))
        .catch(err => res.status(500).json(err))
})
//put
//TODO: UPDATE API
router.put('/plant/:id', (req, res) => {
    if (!req.params.id) res.status(400).send('Missing URL parameter id')

    PlantModel.findOneAndUpdate({
        _id: req.params.id,
    }, req.body, {
        new: true,
    }).then(doc => res.json(doc))
      .catch(err => res.status(500).json(err))
})

//delete
router.delete('/plant/:id', (req, res) => {
    if (!req.params.id) res.status(400).send('Missing URL parameter id')

    PlantModel.findOneAndRemove({
            _id: req.params.id,
        }).then(doc => res.json(doc))
        .catch(err => res.status(500).json(err))
})
// SECTION 2 ADMIN ROUTING AND FUNCTION
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

// this is admin page route
router.get('/view', (req, res) => {
    PlantModel.find().then(doc => {
            res.render('view', {
                msg: 'Successfully loaded',
                doc: doc
            });
        })
        .catch(err => {
            res.render('view', {
                msg: 'Failed to load'
            });
            console.error(err);
        })
})

router.get('/add', (req, res) => {
    res.render('add');
})

module.exports = router