const { Sequelize, DataTypes, Op } = require('sequelize')
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'employee_data',
    password: '123',
    database: 'employee_data'
})

const User = sequelize.define('message',
    {
        id: {
            type: DataTypes.NUMBER,
            autoIncrement: true,
            primaryKey: true
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'message',
        timestamps: false
    }
)

const getMessage = (req, res) => {
    const data = {message : req.params.msg}
    res.render('message', data)
}

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

const showMessage = (req, res) => {
    User.findAll().then(
        (data) => res.render('show_message', { data }),
        (err) => res.send(err)
    )
}

const deleteMessage = (req, res) => {
    User.destroy({ where: {
        id : {
            [Op.eq]: req.params.id
        }
    }}).then(
        () => res.redirect('/message/show'),
        (err) => res.send(err)
    )
}

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

const editMessage = (req, res) => {
    User.findByPk(req.params.id).then(
        (data) => {
           res.render('edit_message', { data })
        },
        (err) => res.send(err)
    )
}

const updateMessage = (req, res) => {
    User.update(
        req.body,
        {
            where: {
                id: req.params.id
            }
        }
    ).then(
        (data) => res.redirect('/message/show'),
        (err) => res.send(err)
    )
}

//ekspor hasil pengambilan objek
module.exports = {
    getMessage,
    getId,
    newMessage,
    postMessage,
    showMessage,
    deleteMessage,
    editMessage,
    updateMessage
}