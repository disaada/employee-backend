const express = require('express')

const app = express()
const port = 4000

//set template engine twig
app.set('view engine', 'twig')

//menampilkan 'welcome' di browser
app.get('/', (req, res) => {
    res.send('welcome')
})

//impor data objek dari file routes/user.js
const message = require('../routes/user')
app.get('/user/:msg', message.varMessage)

app.listen(port, '127.0.0.1', () => {
	console.log(`Example app listening as http://localhost:${port}`)
})