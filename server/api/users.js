const router = require('express').Router()
const { User } = require('../db/models')
const nodemailer = require('nodemailer')
const async = require('async')
const crypto = require('crypto')
// const async = require('async')

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
    .then(users =>{
      let userData = [];
        users.filter(user => {
          let { id, name, firstName, lastName, title, email, personId, teamId, isAdmin, resetPassword  } = user
          return userData.push({ id, name, firstName, lastName, title, email, personId, teamId, isAdmin, resetPassword })
        })
        res.json(userData)
    }

    )
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
  catch (error) {
    next(error)
  }
})

router.put('/admin/users/update/:id', async (req, res, next) => {
  console.log("---------------------------")
  console.log("BODY: ", req.params)
  console.log("---------------------------")
  try {
    let user = await User.findOne({
      where: {
        id: +req.params.id
      }
    })
    console.log("HERE")
    await user.update({
      teamId: req.body.teamId,
      title: req.body.title,
      isAdmin: req.body.isAdmin
    })
    await user.reload()
    res.json(user)
  }
  catch (error) {
    next(error)
  }
})

router.put('/update-password/:id', async (req, res, next) => {
  try {
    await User.findOne({ where: { id: +req.params.id } })
      .then(user => {
        if (!user) {
          res.status(401).send('User not found')
        } else if (!user.correctPassword(req.body.oldPassword)) {
          res.status(401).send('Incorrect password or email')
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
  catch (error) {
    next(error)
  }
})


router.post('/forgot-password', async (req, res, next) => {
  try {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (!user) {
          res.send({ message: `Unablee to find email: ${req.body.email}` })
        }
        else {
          res.send({ message: `An email has been sent to ${req.body.email} with further instructions.` })
          let buf = crypto.randomBytes(20);
          let token = buf.toString('hex');
          let tokenExpire = Date.now() + 3600000;

          user.update({
            resetPasswordToken: token,
            resetPasswordExpires: tokenExpire
          })

          const text = `<p>Hi ${user.dataValues.firstName},</p><p>You are receiving this email because we received a password reset request for your account.</p><p>http://${req.headers.host}/reset/${token}</p><p>If you did not requrest a password reset, no further action is required.</p><p>Onward,</p><p>TSO Optimum Security Team</p><p>Helping you manage your tasks</p>`

          const mailOptions = {
            from: 'tso.optimum@email.com', // sender address
            to: `${req.body.email}`, // list of receivers
            subject: 'TSO Optimum: PASSWORD RESET!', // Subject line
            html: text// plain text body
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);

            } else {
              console.log('Message sent: ' + info.response);
            }
          });
        }
      })
  }

  catch (error) {
    next(error)
  }
})

router.post('/reset-password/:token', async (req, res, next) => {
  console.log("HERE: ", req.params)
  try {
    await User.findOne({
      where: {
        resetPasswordToken: req.params.token
      }
    })
      .then(user => {
        if (user.dataValues.resetPasswordExpires.getTime() > Date.now()) {
          user.update({
            password: req.body.newPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null
          })

          let { id, name, firstName, lastName, title, email, personId, teamId } = user.dataValues
          res.json({id, name, firstName, lastName, title, email, personId, teamId})

          const text = `<p>Hi ${user.dataValues.firstName},</p><h1>You succesfully reset your password!</h1><p>If you did not request to change your password please contact tso.optimum@gmail.com and we'll sort everything out for you.</p><p>Onward,</p><p>TSO Optimum Security Team</p><p>Helping you manage your tasks</p>`

          const mailOptions = {
            from: 'tso.optimum@email.com', // sender address
            to: `${user.dataValues.email}`, // list of receivers
            subject: 'TSO Optimum: PASSWORD RESET SUCESSFULL!', // Subject line
            html: text// plain text body
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Message sent: ' + info.response);
            }
          });

        }
        else {
          console.log('Message: Your Token has expired.')
          res.send({ message: `Your token has expired. Please resubmit your email to reset your password.` })
          // console.log('--------token date:', user.dataValues.resetPasswordExpires.getTime())
          // console.log("----------date now:", Date.now())
        }

      })
  }
  catch (error) {
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
          let { id, name, firstName, lastName, title, email, personId, teamId } = user
          return userData.push({ id, name, firstName, lastName, title, email, personId, teamId })
        })
        res.json(userData)
      })
  }
  catch (error) {
    next(error)
  }
});

