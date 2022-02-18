var path = require('path')
const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();

console.log(`Your API key is ${process.env.API_KEY}`);

const rootPath = path.resolve('../../');
const distPath = path.resolve(rootPath, 'dist', 'index.html');
console.log(distPath)

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static(path.resolve(rootPath, 'dist')))

app.get('/', function (req, res) {
    res.sendFile(distPath)
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})
