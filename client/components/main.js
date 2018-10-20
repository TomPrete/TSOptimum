import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../store'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const { children, handleClick, isLoggedIn, user } = props
  return (
    <div>
      <nav className="flex main-header">
        <a href='/home'>
        <div className="flex logo-container" >
          <img src='/new_logo.png' id="logo" />
          <h1 id="logo-name">hone</h1>

        </div>
        </a>
        {
          isLoggedIn
            ?
            <div className='flex'>
              {/* The navbar will show these links after you log in */}

              <Link className='nav-links' to={`/user/${user.personId}/board`}>My Board</Link>
              <Link className='nav-links' to={`/user/${user.personId}/profile`}>My Profile</Link>
              <a href="#" className='nav-links' onClick={handleClick}>Logout</a>
            </div>
            : <div className='flex'>
              {/* The navbar will show these links before you log in */}
              {/*<form onSubmit={'this.onLoginSubmit'} id="login-submit">
                <div className="form-submit">
                  <div className="form-inputs">
                    <input name="email" type="email" placeholder="Email" className="input" />
                    <input name="password" type="password" placeholder="Password" className="input" />
                  </div>
                </div>
                <button className="submit-button" type='submit'>Login</button>
        </form>*/}
              <Link to="/login" className='nav-links'>Login</Link>
              <Link to="/signup" className='nav-links'>Sign Up</Link>
            </div>

        }

      </nav>

        {children}

    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {

  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

