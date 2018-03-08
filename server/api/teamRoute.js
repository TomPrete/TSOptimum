'use strict'

const router = require('express').Router()
const {Team} = require('../db/models')
module.exports = router

// const userRoute = require('./users');
// const projectRoute = require('./projectRoute');
// const companyRoute = require('./companyRoute')



router.post('/', (req, res, next) => {
  return Team.create(req.body)
    .then(team => res.json(team))
    .catch(next);
});

  //GET company by company ID
  router.get('/:name', (req, res, next) => {
		Team.findOne({where: {name: req.params.name}})
		.then(team => res.json(team))
		.catch(next);
  });

  //GET all companies
	router.get('/:id', (req, res, next) => {
		Team.findAll()
		.then(teams => res.json(teams))
		.catch(next);
	});

  //DELETE a company
  router.delete('/:name', (req, res, next) => {
    return Team.destroy({
      where: {
        name: req.params.name
      }
    })
    .then(affectedRows => res.status(200).json(affectedRows))
    .catch(next);
  });



