const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {

  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/all', (req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(next);
});

router.get('/team/:teamId', (req, res, next) => {
  try {
    User.findAll({
      where: {
        teamId: req.params.teamId
      }
    })
      .then(users => {
        let userData = [];
        users.filter(user => {
          let {id, name, firstName, lastName, title, email, personId, teamId} = user
          return userData.push( {id, name, firstName, lastName, title, email, personId, teamId})
        })
        res.json(userData)})
  }
  catch (error) {
    next(error)
  }
});

