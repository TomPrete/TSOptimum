const Sequelize = require('sequelize')
const db = require('../db')



const Company = db.define('company', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },

  companyId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [8],
      min: 0,
      max: 99999999
    }
  }
})





module.exports = Company
