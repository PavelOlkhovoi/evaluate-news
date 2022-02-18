const dotenv = require('dotenv');

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const rootPath = path.resolve('../../');
const result = dotenv.config({ path: path.resolve(rootPath, '.env')})

console.log(result.parsed)
console.log(`Your API key is ${process.env.SECRET_KEY}`);

// console.log(`Your API key is ${process.env.API_KEY}`);
const distPath = path.resolve(rootPath, 'dist', 'index.html');


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
