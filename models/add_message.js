const User = require('../models/user')

const newMessage = (req, res) => {
    res.render('form_create')
}

const postMessage = (req, res) => {
    //res.send(req.body)
    User.create(req.body).then(
        (msg) => res.redirect('/message/show'),
        (err) => res.send(err)
    )
}

module.exports = {
    newMessage,
    postMessage
}