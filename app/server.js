const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 4000

//set template engine twig
app.set('view engine', 'twig')
//untuk JSON
app.use(bodyParser.urlencoded({extended: true}))

//impor data objek dari file routes/user.js
const message = require('../routes/user')
app.get('/message/', message.newMessage)
app.get('/message/show', message.showMessage)
app.post('/message/new', message.postMessage)
app.post('/message/:id/update', message.updateMessage)
app.get('/message/:msg', message.getMessage)
app.get('/message_id/:msg', message.getId)
app.get('/message/:id/delete', message.deleteMessage)
app.get('/message/:id/edit', message.editMessage)

//menampilkan 'welcome' di browser
app.get('/', (req, res) => {
    res.send('welcome')
})

app.listen(port, '127.0.0.1', () => {
	console.log(`Example app listening as http://localhost:${port}`)
})