require('dotenv').config({path: '.env'});
const express = require('express')
const bodyParser = require("body-parser");
const sequelize = require("./db")
const router = require("./routes/user")
const cors = require('cors')

const app = express()
const port = 8005

app.use(cors())
app.use(bodyParser.json());
app.use('/api', router)



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

