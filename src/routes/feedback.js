let FeedbackModel = require('../models/feedback.model')
let express = require('express')
let router = express.Router()


router.post('/feedback', (req, res) => {
    if (!req.body) {
        res.status(400).send('Request body is missing')
    }

    let model = new FeedbackModel(req.body)
    model.save()
        .then(doc => {
            if (!doc || doc.length === 0) res.status(500).send(doc)

            res.status(201).send(doc)
        })
        .catch(err => res.status(500).json(err))
})

router.get('/feedback', (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        FeedbackModel.find().then(doc => res.json(doc))
            .catch(err => res.status(500).json(err))
    } else {
        FeedbackModel.findOne({
            _id: req.body.id,
        }).then(doc => res.json(doc))
            .catch(err => res.status(500).json(err))
    }
})

// TODO: UPDATE API
// router.put('/feedback', (req, res) => {
//     if (!req.query.email) res.status(400).send('Missing URL parameter email')

//     FeedbackModel.findOneAndUpdate({
//         email: req.query.email,
//     }, req.body, {
//         new: true,
//     }).then(doc => res.json(doc))
//       .catch(err => res.status(500).json(err))
// })

router.delete('/feedback', (req, res) => {
    if (!req.body.id) res.status(400).send('Missing URL parameter id')

    FeedbackModel.findOneAndRemove({
        _id: req.body.id,
    }).then(doc => res.json(doc))
        .catch(err => res.status(500).json(err))
})

module.exports = router