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

  notes: {
    type: Sequelize.TEXT,
    allowNull: true
  }
})

Project.hook('beforeValidate',(project) => {
  if(project.projectId) {
    project.projectId;
  } else project.projectId = Math.floor(100000 + Math.random() * 900000);
  if(project.status === null){
    project.status === "In Process"
  } else project.status
})

module.exports = Project
