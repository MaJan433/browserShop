const cors = require('cors')
const express = require('express')
const {router} = require("./router");
const bodyParser = require("express");
const cookieParser = require("cookie-parser")

const PORT = 3001
const app = express();
// app.use(cors({
//     origin:'http://locahost:3002/test'
// }));
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use('/', router)

app.listen(PORT, 'localhost', void console.log(`listening on port ${PORT}`))