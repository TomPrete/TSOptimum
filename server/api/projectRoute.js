'use strict'

const router = require('express').Router()
const {User, Company, Project} = require('../db/models')
module.exports = router

// const userRoute = require('./users');
// const projectRoute = require('./projectRoute');
const companyRoute = require('./companyRoute')

router.post('/', (req, res, next) => {
  return Project.create(req.body)
    .then(project => res.json(project))
    .catch(next);
});

router.get('/', (req, res, next) => {
  Project.findAll()
  .then(projects => res.json(projects))
  .catch(next);
});

//GET a project by projectId
router.get('/:projectId', (req, res, next) => {
  Project.findOne({where: {projectId: req.params.projectId}})
  .then(projects => res.json(projects))
  .catch(next);
});




router.put('/:projectId', (req, res, next) => {
  return Project.update(req.body, {
    where: { projectId: req.params.projectId },
    returning: true,
    plain: true
  })
  .then(([numRows, updatedRows]) => {
    res.json(updatedRows[0]);
  })
  .catch(next);
});

module.exports = router;

