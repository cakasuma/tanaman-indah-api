let FeedbackModel = require('../models/schema/feedback.model')
let express = require('express')
let router = express.Router()

// SECTION 1 : REST API
router.post('/feedback', (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).send('Request body is missing')
        return
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
    FeedbackModel.find().then(doc => res.json(doc))
        .catch(err => res.status(500).json(err))
})

router.get('/feedback/:id', (req, res) => {
    if (!req.params.id) {
        res.status(400).send('Missing URL parameter id')
        return
    }

    FeedbackModel.findOne({
            _id: req.params.id,
        }).then(doc => res.json(doc))
        .catch(err => res.status(500).json(err))
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

router.delete('/feedback/:id', (req, res) => {
    if (!req.params.id) {
        res.status(400).send('Missing URL parameter id')
        return
    }

    FeedbackModel.findOneAndDelete({
            _id: req.params.id,
        }).then(doc => res.json(doc))
        .catch(err => res.status(500).json(err))
})

// SECTION 2 API ROUTING AND FUNCTION
router.get('/feedbacks', (req, res) => {
    FeedbackModel.find().then(doc => res.render('feedbacks', {
        doc: doc
    }))
    .catch(err => {
        res.render('feedbacks', {
            msg: 'Failed to load'
        });
        console.error(err);
    })
})

module.exports = router