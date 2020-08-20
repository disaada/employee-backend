const {
  Op
} = require('sequelize')
const User = require('../models/user')

//show messages
const showMessage = (req, res) => {
  User.findAll().then(
    (data) => {
      /* if(req.xhr){
          res.send(data)
      } else {
          res.render('show_message', { data })
      } */
      if (req.headers.accept === 'application/json') {
        res.send(data)
      } else {
        res.render('show_message', {
          data
        })
      }
    },
    (err) => res.send(err)
  )
}
//end show messages

//show messages by id
const getId = (req, res) => {
  User.findOne({
    where: {
      id: {
        [Op.eq]: req.params.msg
      }
    }
  }).then(
    (data) => {
      res.send(data)
      //res.render('message', data)
    },
    (err) => res.send(err)
  )
}
//end show messages by id

//add messages
const newMessage = (req, res) => {
  res.render('form_create')
}

const postMessage = (req, res) => {
  //res.send(req.body)
  User.create(req.body).then(
    (msg) => res.redirect('/message'),
    (err) => res.send(err)
  )
}
//end add messages

//edit messages
const getMessage = (req, res) => {
  const data = {
    message: req.params.msg
  }
  res.render('message', data)
}

const editMessage = (req, res) => {
  User.findByPk(req.params.id).then(
    (data) => {
      res.render('edit_message', {
        data
      })
    },
    (err) => res.send(err)
  )
}

const updateMessage = (req, res) => {
  User.update(
    req.body, {
      where: {
        id: req.params.id
      }
    }
  ).then(
    (data) => res.redirect('/message'),
    (err) => res.send(err)
  )
}
//end edit messages

//delete messages
const deleteMessage = (req, res) => {
  User.destroy({
    where: {
      id: {
        [Op.eq]: req.params.id
      }
    }
  }).then(
    () => res.redirect('/message'),
    (err) => res.send(err)
  )
}
//end delete messages

/* const all = (req, res) => {
    User.findAll().then(
        (data) => {
                 if(req.xhr){
                    res.send(data)
                } else {
                    res.render('show_message', { data })
                }
                res.send(data)
            },
        (err) => res.send(err)
    )
} */

module.exports = {
  showMessage,
  getId,
  newMessage,
  postMessage,
  getMessage,
  editMessage,
  updateMessage,
  deleteMessage
}
