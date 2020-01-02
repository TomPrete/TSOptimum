'use strict'

const router = require('express').Router()
const { User, Company } = require('../db/models')
// const {tsa_project_types, projectTypes} = require('./config_helpers/config')

module.exports = router

router.delete('/remove/:companyId', async (req, res, next) => {
  console.log("HERE")
  try {
    let user = await User.findOne({where: {id: req.user.dataValues.id}})
    let company = await Company.findOne({where: {id: +req.params.companyId}})
    await user.removeCompany(company)
    return res.json({'msg': 'success', 'data': 'Deleted'})
  }
  catch(error) {
    next(error)
  }
})

router.post('/add', (req, res, next) => {
  let user = req.body.user;
  try {
    if(user.personId) {
      User.findOne({where:{personId:user.personId}}).then(user => {
        let company = req.body.company;
        Company.findOne({where:{name: company}})
        .then(company => {
          company.addUser(user)
          return res.json({msg: 'success', 'data': company.dataValues})
        })
      })
    }
  }
  catch(error) {
    next(error)
  }
})

router.post('/:id', async (req, res, next) => {
  let user = req.body.user
  let id = +req.params.id
  try {
    if(user.id === id) {
      let foundUser = await User.findOne({
        where: {id: id}
      })
      let portfolio = []
      foundUser.getCompanies().then(associatedCompany => {
        let count = 0;
        associatedCompany.forEach(val => {
          count++
          // console.log("COUNT: ", count)
          let {id, name, companyId} = val.dataValues
          portfolio.push({id,name,companyId})
        })
      }).then(data => {
        return res.json(portfolio)
      })
    }
  }
  catch(error) {
    next(error)
  }
})


