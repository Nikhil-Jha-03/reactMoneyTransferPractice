const express = require('express')
const app = express();
const db = require('./database/db')
const cors = require('cors')

const rootRouter = require('./api/v1/index');


app.use(cors())
app.use(express.json())
app.use('/api/v1',rootRouter)
app.use(express.static('public'))


app.listen(3000)

