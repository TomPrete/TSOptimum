import React, { Component } from 'react';
import { connect } from 'react-redux';
import store, {updateUserPasswordThunk} from '../store'




class ChangePasswordModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }

    this.inputNewPassword = this.inputNewPassword.bind(this)
    this.inputConfirmNewPassword = this.inputConfirmNewPassword.bind(this)
    this.inputOldPassword = this.inputOldPassword.bind(this)
    this.onSubmitChangePassword = this.onSubmitChangePassword.bind(this)
  }

  inputOldPassword(e) {
    this.setState({
      oldPassword: e.target.value
    })
  }

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

  onSubmitChangePassword(e) {
    e.preventDefault()
    let oldPassword = this.state.oldPassword
    let newPassword = this.state.newPassword
    let confirmNewPassword = this.state.confirmNewPassword
    let email = this.props.user.email
    let id = this.props.user.id
    this.props.updateUserPasswordThunk(id, email, oldPassword, newPassword)
    window.location.reload()
  }


  render() {
    return (
      <div id="projects-modal-container">
        <div className='project-modal-header'>
          <label className='project-label'>Change Your Password</label>
          <span className='closeBtn' onClick={() => this.props.showChangePasswordModal()}>&times;</span>
        </div>

        <div className='edit-project-form'>
          <div id="edit-form-container">
            <form onSubmit={this.onSubmitChangePassword}  id="edit-project-form">
              <div>
              <p>Current Password</p>
              <input name="old_password" onChange={this.inputOldPassword} type="password" className="edit-select-company" required />
              </div>
              <div>
              <p>New Password</p>
              <input name="new_password" onChange={this.inputNewPassword} type="password" className="edit-select-company" required />
              </div>
              <div>
              <p>Confirm New Password</p>
              <input name="verify_new_password" onChange={this.inputConfirmNewPassword} type="password" className="edit-select-company" required />
              {
                this.state.confirmNewPassword.length > 1 && this.state.newPassword !== this.state.confirmNewPassword
                ?
                <p>Passwords must match</p>
                :
                null
              }
              </div>
            </form>
            <div className="edit-div-submit">
              <button className="edit-project-submit" form="edit-project-form" type='submit' disabled={this.state.newPassword !== this.state.confirmNewPassword}>Update Password</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    teamMates: state.teamMates,
    companies: state.companies,
    project: state.project
  }
}

const mapDispatch = {updateUserPasswordThunk}

const ChangePasswordModalContainer = connect(mapState, mapDispatch)(ChangePasswordModal)

export default ChangePasswordModalContainer
