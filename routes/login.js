const models = require('../models')
const bcrypt = require('bcrypt')
const User = models.user
const { querySchema, validator } = require('../validation/login')
const option = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: false
}

const post_login = async(req, res) => {
  const { username, password } = req.body

  const { error, value } = querySchema.validator(req.body, option)
  const errorBag = error.details.map(value => ({name: value.content.label, message: value.message}))

  if(errorBag.length < 1) {
    const data = value
    data.password = bcrypt.hashSync(req.query.password, 10)

    const user = await User.create(data)
    res.redirect('/login')
  } else {
    req.session.errorBag =
    res.redirect('/login')
  }

}

const get_login = (req, res) => {

  res.render('form_login')

}

module.exports = {
  post_login,
  get_login
}

/* const user = await User.findOne({ where: {name: username}})
  if(user) {
    const match = bcrypt.compareSync(password, user.password)
    if(match) {
      req.session.loggedIn = user
      res.send('success login')
    }
    else
      res.redirect('/login')
  }
  else {
    const data = {
      'name': req.query.username,
      'password': bcrypt.hashSync(req.query.password, 10),
      'email': req.query.email,
      'date_birth': req.query.date_birth
    }

    await User.create(data)
    res.redirect('/login')
  } */
