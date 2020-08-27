const models = require('../models')
const bcrypt = require('bcrypt')
const User = models.user
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})
const option = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: false
}

const post_login = async(req, res) => {
  //const { username, password } = req.body
  const { username, password, email, date_birth } = require('../validation')
  const querySchema = Joi.object({ username, password, email, date_birth })

  //validate adalah salah satu function dari Joi.object.
  //Dia mengembalikan objek dengan properti : value, error, warning, artifact (map yang mem-passing artifact)
  const result = querySchema.validate(req.body, option)
  const { error, value } = result
  const keys = Object.keys(value)
  const data = keys.map((key) => ({name: key, value: value[key]}))
  if(error){
      error.details.forEach(valueWithError => {
        const key = valueWithError.context.key
        const errorMessage = valueWithError.message
        const processedValue = valueWithError.context.value
        const _value = error._original[key]
        data.forEach((d, i) => {
          if(d.name === key) {
            data[i] = {
              name: d.name,
              value: processedValue,
              error: errorMessage,
              _value: _value
            }
          }
        })
      })
  }

  const reduced = data.reduce((acc, cv, idx) => {
    acc[cv.name] = cv
    return acc
  }, {})

  if(error) {
    req.session.data = reduced
    req.session.save(
      () => res.redirect('/login')
    )
  }

  // res.send(reduced)
  //res.send(req.session.data)

}

const get_login = (req, res) => {

  data = req.session.data
  req.session.data = undefined
  res.render('form_login', { data })

}

module.exports = {
  post_login,
  get_login
}

  /* if(errorBag.length < 1) {
    const data = value
    data.password = bcrypt.hashSync(req.query.password, 10)

    const user = await User.create(data)
    res.redirect('/login')
  } else {
    req.session.errorBag =
    res.redirect('/login')
  } */

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
