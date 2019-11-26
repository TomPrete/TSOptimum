import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Router, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import { Main, Login, SignUp, UserBoard, UserProfile, LandingPage, Projects, CompletedProjects, AllUserProjects, TeamAnalytics, ForgotPassword, PasswordReset, AdminHome, AdminUsers, AdminTeams, AdminCompanies, CompaniesHomePage, MyPortfolio} from './components'
import store, { me, fetchAllCompanies, fetchAllUserProjects } from './store'


/*** COMPONENT ***/
class Routes extends Component {
  async componentDidMount() {
    await this.props.loadInitialData()
    const fetchCompanies = await fetchAllCompanies()
    store.dispatch(fetchCompanies)
    console.log("Mounted routes...")
  }



  render() {
    const { isLoggedIn, user } = this.props
    return (
      <Router history={history}>
        <Main>
          <Switch>

            <Route exact path='/' component={LandingPage} />
            <Route exact path='/home' component={LandingPage} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />

            <Route exact path='/forgot_password' component={ForgotPassword} />
            <Route exact path='/reset/:resetToken' component={PasswordReset} />
          </Switch>
          {
            isLoggedIn
            &&
            <Switch>
            <Route exact path='/my-board' render={(props) => <UserBoard {...props} page='process' /> } />
            {/*<Route exact path='/my-board' component={UserBoard} />*/}
            <Route exact path='/my-projects' component={Projects} />
            <Route exact path='/my-profile' component={UserProfile} />
            <Route exact path='/my-completed-tasks' render={(props) => <UserBoard {...props} page='completed' />} />
            {/*<Route exact path='/my-created_projects' component={AllUserProjects} />*/}
            <Route exact path='/my-created-tasks' render={(props) => <UserBoard {...props} page='created' />} />
            {/*<Route exact path='/my-created_projects' component={UserBoard} />*/}
            <Route exact path='/team-analytics' component={TeamAnalytics} />
            <Route exact path='/my-admin' component={AdminHome} />
            <Route exact path='/my-admin/users' component={AdminUsers} />
            <Route exact path='/my-admin/teams' component={AdminTeams} />
            <Route exact path='/my-admin/companies' component={AdminCompanies} />
            <Route exact path='/companies/home-page'  component={CompaniesHomePage} />
            <Route exact path='/my-portfolio'  component={MyPortfolio} />
            </Switch>
          }
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    user: state.user,
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
      console.log("loadIniital Data")
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
