import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {loginUser} from '../store'

/**
 * COMPONENT
 */
const Login = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <h3>Welcome back! Login to your account.</h3>
      <form onSubmit={handleSubmit} name='login' id="login-submit">
        <div>
          {/*<label htmlFor="email"><small>Email</small></label>*/}
          <input name="email" type="text" placeholder="Email" className="input" />
        </div>
        <div>
          {/*<label htmlFor="password"><small>Password</small></label>*/}
          <input name="password" type="password" placeholder="Password" className="input" />
        </div>
        <div>
        <button className="submit-button" type='submit'>{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}


/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}


const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(loginUser(email, password))
    }
  }
}

const LoginContainer = connect(mapLogin, mapDispatch)(Login)

export default LoginContainer

/**
 * PROP TYPES
 */
Login.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
