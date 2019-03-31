require('dotenv').config()
let express = require('express')
let cors = require('cors');
let app = express()
let ejs = require('ejs')
require('./models/init')
let feedbackRoute = require('./routes/feedback')
let plantRoute = require('./routes/plant')
let path = require('path')
let bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.use(cors())
app.use(bodyParser.json())
app.use((req, res, next) => {
    console.log(`${new Date()} => ${req.originalUrl}`, req.body)
    next()
})
app.use(feedbackRoute)
app.use(plantRoute)
app.use(express.static('public'))

app.get('/', (req, res) => res.render('index'))

app.use((req, res, next) => {
    res.status(404).send('We think you are lost')
})

app.use((err, req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/505.html'))
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server is listening to ${PORT}`))