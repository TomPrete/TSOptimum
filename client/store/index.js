import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import users from './users'
import teamMates from './team_mates'
import companies from './companies'
import projects from './projects'
import project from './project'
import team from './team'
import teams from './teams'
import portfolio from './portfolio'
import company from './company'


const reducer = combineReducers({user, users, teamMates, team, companies, projects, project, team, portfolio, company, teams})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './users'
export * from './team_mates'
export * from './companies'
export * from './projects'
export * from './project'
export * from './team'
export * from './teams'
export * from './portfolio'
export * from './company'
