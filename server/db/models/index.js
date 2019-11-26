const User = require('./user')
const Project = require('./Project')
const Company = require('./Company')
const Team = require('./Team')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 *
 *
 */

// Address.belongsTo(Order)

// Order.hasMany(OrderItem)// Old association: OrderItem.belongsTo(Order)

// OrderItem.belongsTo(Product)

// Order.belongsTo(User)

// Review.belongsTo(Product)
// Review.belongsTo(User)

Team.hasMany(User)

// Project.belongsTo(User, {foreignKey: 'fk_personId', targetKey: 'personId'})
Project.belongsTo(User)
Project.belongsTo(Team)

Project.belongsToMany(User, {through: 'projects_users'})
User.belongsToMany(Project, {through: 'projects_users'})

Company.belongsToMany(User, {through: 'Portfolio'})
User.belongsToMany(Company, {through: 'Portfolio'})

Project.belongsToMany(Company, {through: 'company_projects'})

module.exports = {
  User,
  Project,
  Company,
  Team
}
