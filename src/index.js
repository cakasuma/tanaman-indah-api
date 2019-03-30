let express = require('express')
let app = express()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server is listening to ${PORT}`))