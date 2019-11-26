'use strict'

const router = require('express').Router()
const { User, Company } = require('../db/models')
// const {tsa_project_types, projectTypes} = require('./config_helpers/config')

module.exports = router



router.post('/add', async (req, res, next) => {
  let user = req.body.user;
  try {
    if(user.personId) {
      User.findOne({where:{personId:user.personId}}).then(user => {
        let companies = req.body.companies;
        companies.forEach(elem => {
          return Company.findOne({where:{name: elem.value}})
          .then(company => {
            company.addUser(user)
            return company.dataValues
          })
        })
        let portfolio = []
        user.getCompanies().then(associatedCompany => {
          associatedCompany.forEach(val => {
            let {id, name, companyId} = val.dataValues
            portfolio.push({id,name,companyId})
          })
        }).then(data => {
          return res.json(portfolio)
        })
      })
    }
  }
  catch(error) {
    next(error)
  }
})
