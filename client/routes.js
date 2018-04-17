import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Router, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import { Main, Login, SignUp, UserBoard, UserProfile, LandingPage } from './components'
import store, { me, postNewUser, logout, fetchUserTeam, fetchAllCompanies, fetchAllProjects, fetchUserProjects } from './store'


/*** COMPONENT ***/
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    const fetchCompanies = fetchAllCompanies()
    // const fetchProjects = fetchAllProjects()
    store.dispatch(fetchCompanies)
    // store.dispatch(fetchProjects)
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
            <Route exact path='/user/:personId/board' component={UserBoard} />
            <Route exact path='/user/:personId/profile' component={UserProfile} />
          </Switch>
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
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
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
