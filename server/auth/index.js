const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router


router.post('/login', (req, res, next) => {
  try {
    User.findOne({where: {email: req.body.email, userStatus: 'Active'}})
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (user.resetPassword == true) {
        res.status(401).send("You must reset password. Click 'Forgot My Password.'")
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password or email')
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)))
      }
    })
  }
  catch(error) {
    next(error)
  }
})

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)))
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  try {
    if (req.user) {
      let {id, firstName, lastName, email, title, personId, isAdmin, teamId } = req.user.dataValues
      res.json({id, firstName, lastName, email, title, personId, isAdmin, teamId })
    }
  }
  catch(error) {
    next(error)
  }
})

router.use('/google', require('./google'))
