require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const sequelize = require('./db')
const router = require('./routes/index')
const errorMidleware = require('./middlewares/error-middleware')
const PORT = process.env.PORT

const app = express()
app.use(cors( {
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(cookieParser())
app.use(express.json())
app.use('/api', router)
app.use(errorMidleware)

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync()
        app.listen(PORT, () => console.log('SERVER WORKING'))
    }
    catch(e)
    {
        console.log('ERROR: ', e)
    }
}

start()