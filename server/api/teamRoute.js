'use strict'

const router = require('express').Router()
const {Team} = require('../db/models')
module.exports = router

// const userRoute = require('./users');
// const projectRoute = require('./projectRoute');
// const companyRoute = require('./companyRoute')



router.post('/', (req, res, next) => {
  return Team.bulkCreate(req.body)
    .then(team => res.json(team))
    .catch(next);
});

  //GET company by teamId
  router.get('/:id', (req, res, next) => {
		Team.findOne({where: {id: req.params.id}})
		.then(team => {
      let teamName = team.dataValues.name.charAt(0).toUpperCase() + team.dataValues.name.slice(1);
      return res.json(teamName)})
		.catch(next);
  });

  //GET all Teams
	router.get('/', (req, res, next) => {
		Team.findAll()
    .then(teams => res.json(teams))
		.catch(next);
	});

  //DELETE a team
  router.delete('/:name', (req, res, next) => {
    return Team.destroy({
      where: {
        name: req.params.name
      }
    })
    .then(affectedRows => res.status(200).json(affectedRows))
    .catch(next);
  });



