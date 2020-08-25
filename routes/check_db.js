const models = require('../models')
console.log(models)
const User = models.user

const check_route = async(req, res) => {
  const user = await User.findAll()
  res.send(user)
}

module.exports = check_route
