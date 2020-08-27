const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 4000

const fileupload = require('express-fileupload')
const passport = require('passport')

const session = require('express-session')
const sess = require('express-session-sequelize')
const SessionStore = sess(session.Store)

const db = require('../models')
const sequelizeSessionStore = new SessionStore({
  db: db.sequelize,
});

const hbs = require('express-hbs')
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '../views/partials'
}))
//set template engine twig/hbs
app.set('view engine', 'hbs')


//untuk JSON
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' },
  store: sequelizeSessionStore
}));
// app.use(validationErrorHandling);

//impor data objek dari file routes/user.js
const message = require('../routes/message')
//show messages
app.get('/message', message.showMessage)
//show messages by id
app.get('/message_id/:msg', message.getId)
//add messages
app.get('/message/form', message.newMessage)
app.post('/message/new', message.postMessage)
//edit messages
app.post('/message/:id/update', message.updateMessage)
app.get('/message/:msg', message.getMessage)
app.get('/message/:id/edit', message.editMessage)
//delete messages
app.get('/message/:id/delete', message.deleteMessage)

///////////////////////////LOGIN///////////////////////////
const login = require('../routes/login')
const loginValidation = require('../validation')
app.get('/login', login.get_login)
app.post('/login', /* loginValidation, */ login.post_login)
///////////////////////////////////////////////////////////

//app.get('/check_db', require('../routes/check_db'))

//menampilkan 'welcome' di browser
app.get('/', (req, res) => {
    res.render('home')
})

app.listen(port, '127.0.0.1', () => {
	console.log(`Example app listening as http://localhost:${port}`)
})
