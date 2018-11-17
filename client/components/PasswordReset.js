import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { addNewUser, resetPassowordThunk } from '../store';



class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      confirmNewPassword: false,
    }

    this.handlePasswordResetSubmit = this.handlePasswordResetSubmit.bind(this);
    this.inputNewPassword = this.inputNewPassword.bind(this)
    this.inputConfirmNewPassword = this.inputConfirmNewPassword.bind(this)
  };

  inputNewPassword(e) {
    this.setState({
      newPassword: e.target.value
    })
  }

  inputConfirmNewPassword(e) {
    this.setState({
      confirmNewPassword: e.target.value
    })
  }



  handlePasswordResetSubmit(e) {
    e.preventDefault()
    let token = this.props.match.params.resetToken;
    let newPassword = this.state.newPassword;
    let confirmNewPassword = this.state.confirmNewPassword
    this.props.resetPassowordThunk(token, newPassword, confirmNewPassword);
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
        <h1 className="forgot-password-title">Reset your password?</h1>
          <form onSubmit={this.handlePasswordResetSubmit} id='forgot-password-form'>
          <div>
              </div>
              <div>
              <input name="new_password" onChange={this.inputNewPassword} type="password" className="edit-select-company" placeholder="Enter New Password" required />
              </div>
              <div>
              <input name="verify_new_password" onChange={this.inputConfirmNewPassword} type="password" className="edit-select-company" placeholder="Enter New Password Again" required />
              {
                this.state.confirmNewPassword.length > 1 && this.state.newPassword !== this.state.confirmNewPassword
                ?
                <p>Passwords must match</p>
                :
                null
              }
              </div>
            <button className="signup-button" type='submit' >Reset My Password</button>
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

const mapDispatchToProps = { resetPassowordThunk }

const PasswordResetContainer = connect(mapStateToProps, mapDispatchToProps)(PasswordReset)

export default PasswordResetContainer
