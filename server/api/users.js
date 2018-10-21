const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

// router.get('/', (req, res, next) => {

//   User.findAll({
//     // explicitly select only the id and email fields - even though
//     // users' passwords are encrypted, it won't help if we just
//     // send everything to anyone who asks!
//     attributes: ['id', 'email']
//   })
//     .then(users => res.json(users))
//     .catch(next)
// })

router.get('/all', (req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(next);
});

router.put('/update/:id', async (req, res, next) => {
  try {
    let user = await User.find({
      where: {
        id: +req.params.id
      }
    })
    await user.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    })
    await user.reload()
    res.json(user)
  }
  catch(error) {
    next(error)
  }
})

router.put('/update-password/:id', async (req, res, next) => {
  console.log("-------------------------BODY----------------", req.body)
  try {
    User.findOne({where: {id: +req.body.id}})
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.currentPassword)) {
        res.status(401).send('Incorrect current password')
      } else {
        user.update({
          password: req.body.newPassword
        })
      }
    })
  }
  catch(error) {
    next(error)
  }
})


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

