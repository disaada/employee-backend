const { Sequelize, DataTypes } = require('sequelize')
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

module.exports = User
