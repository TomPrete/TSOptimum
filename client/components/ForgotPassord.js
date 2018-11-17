import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { addNewUser, forgotUserPasswordThunk } from '../store';



class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      redirect: false,
    }

    this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
  };


  handleEmailSubmit(e) {
    e.preventDefault()
    const email = e.target.email.value
    this.props.forgotUserPasswordThunk(email);
  }


  render() {
    return (
      <div>
      {
        this.props.user.message
        ?
        <div>
        {this.props.user.message}
        </div>
        :
        null
      }

        <div id='forgot-password-form-panel'>
        <h1 className="forgot-password-title">Forgot you password?</h1>
          <form onSubmit={this.handleEmailSubmit} id='forgot-password-form'>
            <div>
              <input className="email-input" name='email' type="email" placeholder="Email" required />
            </div>
            <button className="signup-button" type='submit' >Send Instructions</button>
          </form>
        </div>
      </div>
    )
  };
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = { forgotUserPasswordThunk }

const ForgotPasswordContainer = connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)

export default ForgotPasswordContainer
