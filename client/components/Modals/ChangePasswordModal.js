import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'
import colors from '../colors';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { updateUserPasswordThunk } from '../../store'


class ChangePasswordModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      confirmNewPassword: '',
      passwordError: false
    }
  }

  onSubmitChangePassword = (evt) => {
    evt.preventDefault()
    let oldPassword = evt.target.oldPassword.value;
    let newPassword = evt.target.newPassword.value;
    let newPasswordAgain = evt.target.newPasswordAgain.value
    if (newPassword !== newPasswordAgain) {
      this.setState({
        passwordError: true
      })
      return console.error("Passwords must match")
    }
    let email = this.props.user.email
    let id = this.props.user.id
    console.log(evt.target.oldPassword.value)
    this.props.updateUserPasswordThunk(id, email, oldPassword, newPassword)
    window.location.reload()
  }

  render() {
    return (
      <div>
        <Modal
          id='default-modal'
          open={this.props.showModal}
          onClose={this.props.showPasswordModal}
        >
          <ModalContentContainer >
            <ModalHeader>
              Change Password
            </ModalHeader>
            <FormContainer>
              <form onSubmit={this.onSubmitChangePassword}>
                <label>Old Password</label>
                <TextField
                  required
                  style={{ margin: '10px 10px 10px 0', width: '93%' }}
                  label='Old Password'
                  variant='outlined'
                  type='password'
                  name='oldPassword'
                  fullWidth
                />
                <label>New Password</label>
                <TextField
                  required
                  style={{ margin: '10px 10px 10px 0', width: '93%' }}
                  label='New Password'
                  variant='outlined'
                  type='password'
                  name='newPassword'
                  fullWidth
                />
                <label>{`New Password (again)`}</label>
                <TextField
                  error={this.state.passwordError}
                  required
                  style={{ margin: '10px 10px 10px 0', width: '93%' }}
                  label='New Password (again)'
                  variant='outlined'
                  type='password'
                  name='newPasswordAgain'
                  helperText={this.state.passwordError && "Passwords must match"}
                  fullWidth
                />
                <Button
                  style={colors.buttonStyles}
                  variant="contained"
                  color="primary"
                  size='large'
                  type='submit'
                >Save</Button>
              </form>
            </FormContainer>
          </ModalContentContainer>
        </Modal>
      </div>
    )
  }
}

const ModalContentContainer = styled.div`
  position: absolute;
  top: 10%;
  left: 40%;
  width: 500px;
  background-color: white;
  outline: none;
  box-shadow: 0 3px 10px #16161d
`

const ModalHeader = styled.div`
  text-align: center
  background-color: rgb(0, 151, 131);
  padding: 20px;
  font-size: 24px;
  color: white
`

const FormContainer = styled.div`
  padding: 10px 0 20px 10px;
`

const mapState = state => {
  return {
    user: state.user,
    teamMates: state.teamMates,
    companies: state.companies,
    project: state.project
  }
}

const mapDispatch = { updateUserPasswordThunk }

const ChangePasswordModalContainer = connect(mapState, mapDispatch)(ChangePasswordModal)

export default ChangePasswordModalContainer
