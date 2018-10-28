const router = require('express').Router()
const { User } = require('../db/models')
const nodemailer = require('nodemailer')

module.exports = router


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'tso.optimum@gmail.com',
         pass: process.env.GOOGLE_AUTO_EMAIL
     }
 });


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
  try {
    await User.findOne({where: {id: +req.params.id}})
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.oldPassword)) {
        res.status(401).send('Incorrect current password')
      }
      else {
        const text = `<p>Hi ${user.dataValues.firstName},</p><h1>You succesfully changed your password!</h1><p>If you did not request to change your password please contact tso.optimum@gmail.com and we'll sort everything out for you.</p><p>Onward,</p><p>TSO Optimum Security Team</p><p>Helping you manage your tasks</p>`

        const mailOptions = {
          from: 'tso.optimum@email.com', // sender address
          to: `${req.body.email}`, // list of receivers
          subject: 'TSO Optimum: PASSWORD CHANGED!', // Subject line
          html: text// plain text body
        };

        user.update({
          password: req.body.newPassword
        })


        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            res.json({ yo: 'error' });
          } else {
            console.log('Message sent: ' + info.response);
            res.json({ yo: info.response });
          }
        });


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

