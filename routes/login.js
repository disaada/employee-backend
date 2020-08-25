const models = require('../models')
const bcrypt = require('bcrypt')
const User = models.user

const post_login = async(req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ where: {name: username}})
  if(user) {
    const match = bcrypt.compareSync(password, user.password)
    if(match) {
      req.session.loggedIn = user
      res.redirect('/login')
    }
    else res.redirect('/login')
  }
  else res.redirect('/login')
}

const get_login = (req, res) => {

  res.render('form_login')

}

module.exports = {
  post_login,
  get_login
}
