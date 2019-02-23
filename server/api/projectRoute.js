'use strict'

const router = require('express').Router()
const { User, Company, Project } = require('../db/models')
module.exports = router




router.post('/', (req, res, next) => {
  console.log("HERE")
  return Project.create(req.body)
    .then(project => res.json(project))
    .catch(next);
});


router.get('/all', (req, res, next) => {
  Project.findAll()
    .then(projects => {
      projects.sort((a, b) => {
        a = new Date(a.dueDate)
        b = new Date(b.dueDate)
        return a < b ? -1 : a > b ? 1 : 0
      })
      res.json(projects)
    })
    .catch(next);
});


router.get('/in-process/:id', (req, res, next) => {
  let id = +req.params.id
  Project.findAll({
    where: {
      userId: id,
      status: 'In Process'
    }
  })
    .then(projects => {
      projects.sort((a, b) => {
        a = new Date(a.dueDate)
        b = new Date(b.dueDate)
        return a < b ? -1 : a > b ? 1 : 0
      })
      res.json(projects)
    })
    .catch(next);
})

router.get('/complete/:id', (req, res, next) => {
  let id = +req.params.id;
  Project.findAll({
    where: {
      userId: id,
      status: 'Complete'
    }
  })
    .then(projects => {
      console.log("completed")
      projects.sort((a, b) => {
        a = new Date(a.updatedAt)
        b = new Date(b.updatedAt)
        return a < b ? -1 : a > b ? 1 : 0
      })
      res.json(projects)
    })
    .catch(next => { console.log("HERE") })
})

router.get('/user_:id', (req, res, next) => {
  let id = +req.params.id;
  Project.findAll({
    where: {
      userId: id
    }
  })
    .then(projects => {
      projects.sort((a, b) => {
        a = new Date(a.dueDate)
        b = new Date(b.dueDate)
        return a < b ? -1 : a > b ? 1 : 0
      })
      res.json(projects)
    })
  // .catch(next)
})

router.get('/:projectId', (req, res, next) => {
  let id = +req.params.projectId;
  Project.findOne({
    where: {
      projectId: id
    }
  })
    .then(project => res.json(project.dataValues))
    .catch(next)
})

router.put('/:projectId', (req, res, next) => {
  console.log("HERE: ", req.params.projectId)
  return Project.update(req.body, {
    where: {
      projectId: req.params.projectId
    }
  })
    .then(project => res.json(project.data))
  // .then(([numRows, updatedRows]) => {
  //   res.json(updatedRows[0]);
  // })
  // .catch(next);
});

// router.get('/:id/orders', async (req, res, next) => {
//   try {
//     const orders = await Order.findAll({
//       where: {
//         status: 'Completed',
//         userId: +req.params.id
//       },
//       include: [{
//         model: OrderItem
//       }]
//     })
//     res.json(orders)
//   }
//   catch (error) {
//     next(error)
//   }
// })


//GET a project by projectId
// router.get('/:id', async (req, res, next) => {
//   console.log("PROJECT ID: ", req.params.id)
//   const project = await Project.findOne({where: {projectId: +req.params.id}})
//   const user = await project.addUser(+req.params.id)
//   .then(user => res.json(user))
// .catch(next);
// });


// router.put('/:projectId', (req, res, next) => {
//   return Project.update(req.body, {
//     where: { projectId: req.params.projectId },
//     returning: true,
//     plain: true
//   })
//     .then(([numRows, updatedRows]) => {
//       res.json(updatedRows[0]);
//     })
//     // .catch(next);
// });

module.exports = router;

