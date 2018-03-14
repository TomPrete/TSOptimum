const Sequelize = require('sequelize')
const db = require('../db')

const Project = db.define('project', {
  projectId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    unique: true,
    validate: {
      len: [6],
      min: 0,
      max: 999999
    }
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  projectType: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  officer: {
    type: Sequelize.STRING,
    allowNull: true
  },

  analyst: {
    type: Sequelize.STRING,
    allowNull: true
  },


  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: null
  },

  dueDate: {
    type: Sequelize.DATEONLY
  },

  // duration: {
  //   type: Sequelize.VIRTUAL,
  //   get() {
  //     let start = new Date(this.getDataValue('startDate'))
  //     let due = new Date(this.getDataValue('dueDate'))

  //     return (((due - start)/86400000))
  //   }
  // },

  notes: {
    type: Sequelize.TEXT,
    allowNull: true
  }
}
// , {
//   getterMethods: {
//   allDates () {
//       let dates = []
//       let currentDate = this.arrivalDate
//       let addDays = function(days) {
//         let date = new Date(this.valueOf())
//         date.setDate(date.getDate() + days)
//         return date
//       }
//       for (var i = 0; i <= this.duration; i++){
//         dates.push(currentDate)
//         currentDate = addDays.call(currentDate, 1)
//       }
//       return dates
//   }
// }
// }
)


// Project.hook('beforeUpdate', (project) => {
//   let start = new Date(project.startDate)
//   let due = new Date(project.dueDate)

//   project.duration = (((start - due)/86400000)+1)
// })

Project.hook('beforeValidate',(project) => {
  if(project.projectId) {
    project.projectId;
  } else project.projectId = Math.floor(100000 + Math.random() * 900000);
  if(project.status === null){
    project.status === "In Process"
  } else project.status
})

module.exports = Project
