const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },

  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },

  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },

  title:  {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  },

  password: {
    type: Sequelize.STRING
  },

  salt: {
    type: Sequelize.STRING
  },

  personId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    unique: true,
    validate: {
      len: [4],
      min: 0,
      max: 9999
    }
  }
}, {
  getterMethods: {
    name() {
      return this.firstName + ' ' + this.lastName;
    }
  }

})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt) === this.password
}

/**
 * classMethods
 */
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */

User.hook('beforeValidate',(user) => {
  user.personId = Math.floor(1000 + Math.random() * 9000);
})

const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
