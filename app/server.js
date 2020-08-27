const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 4000

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
  partialsDir: __dirname + '/../views/partials',
  defaultLayout: __dirname + '/../views/layout/default.hbs'
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
}))
app.use('/tmp', express.static('tmp'))
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

///////////////////////UPLOAD PHOTO////////////////////////
const fileUpload = require('express-fileupload')
const Photo = db.photo

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '../tmp'
}))

app.get('/photo', (req, res) => {
  res.render('photo')
})

app.post('/photo/post', (req, res) => {

  if(req.files) {
    const { name } = req.files.photo

    res.send(name)
    Photo.create({
      photo: name
    }).then(
      () => res.redirect('/photo'),
      (err) => res.send(err)
    )
  } else {
    res.send('No file uploaded')
  }

})
///////////////////////////////////////////////////////////

//menampilkan 'welcome' di browser
app.get('/', (req, res) => {
    res.render('home')
})

app.listen(port, '127.0.0.1', () => {
	console.log(`Example app listening as http://localhost:${port}`)
})
