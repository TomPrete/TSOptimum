'use strict'

const router = require('express').Router()
const {User, Company} = require('../db/models')
module.exports = router

// const userRoute = require('./users');
// const projectRoute = require('./projectRoute');
// const companyRoute = require('./companyRoute')



router.post('/', (req, res, next) => {
  return Company.bulkCreate(req.body)
    .then(company => res.json(company))
    .catch(next);
});

//GET company by company ID
router.get('/:companyId', (req, res, next) => {
  console.log("REQ: ", +req.params.companyId)
  Company.findOne({attributes: ['id', 'name', 'companyId'], where: {companyId: req.params.companyId}})
  .then(company => res.json(company))
  .catch(next);
});

  //GET all companies
	router.get('/', (req, res, next) => {
		Company.findAll()
		.then(companies => res.json(companies))
		.catch(next);
	});

  //DELETE a company
  // router.delete('/:companyId', (req, res, next) => {

  //   return Company.destroy({
  //     where: {
  //       companyId: req.params.companyId
  //     }
  //   })
  //   .then(affectedRows => res.status(200).json(affectedRows))
  //   .catch(next);
  // });

  //UPDATE a company
  router.put('/', (req,res,next) => {
    for (let i=0; i < req.length; i++) {
      console.log("COMPANY: ", req[i]['companyId'])
    }
  })

module.exports = router;
