require('dotenv').config({path: '.env'});
const express = require('express')
const bodyParser = require("body-parser");
const sequelize = require("./db")
const userRoute = require("./routes/user")
const cors = require('cors')

const app = express()
const port = process.env.EXPRESS_PORT

app.use(cors())
app.use(bodyParser.json());

app.use('/user', userRoute)

async function start() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection has been established successfully.');
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

start()

