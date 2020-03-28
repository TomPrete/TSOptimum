import React, { useState } from 'react';
import { connect } from 'react-redux';
import firebase from '../../firebase'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Select from 'react-select'
import styled from 'styled-components';
import colors from '../colors';
import { titleTypes } from '../config.js'
import { updateUserThunk } from '../../store'
import ChangePasswordModal from '../Modals/ChangePasswordModal.js'


const UserProfileInfo = ({ firstName, lastName, email, title, personId, isAdmin, id, updateUserThunk }) => {
  const [fName, setFName] = useState(null)
  const [lName, setLName] = useState(null)
  const [newEmail, setNewEmail] = useState(null)
  const [edited, setEdited] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleFirstName = (evt) => {
    setFName(evt.target.value)
  }

  const handleLastName = (evt) => {
    setLName(evt.target.value)
  }

  const handleEmail = (evt) => {
    setNewEmail(evt.target.value)
  }

  const customStyles = {
    control: (styles) => ({
      ...styles, width: '93%', padding: '10px 5px', margin: '10px 10px 10px 0'
    }),
    menu: (styles) => ({ ...styles, width: '93%', padding: '10px 5px', zIndex: '2' })
  }

  const buttonStyles = {
    backgroundColor: 'rgb(0, 151, 131)',
    width: '30%'
  }

  const submitUpdatedProfile = (evt) => {
    evt.preventDefault()
    let newFirstName = evt.target.firstName.value || firstName
    let newLastName = evt.target.lastName.value || lastName
    let newEmail = (evt.target.email.value.length > 0 && evt.target.email.value.includes("@")) ? evt.target.email.value : email
    updateUserThunk(id, newFirstName, newLastName, newEmail)
    return handleSnackBarClose()
  }

  const handleSnackBarClose = () => {
    setEdited(!edited)
  }

  const showPasswordModal = () => {
    setShowModal(!showModal)
  }

  return (
    <UserProfileInfoContainer>
      {
        edited
        &&
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          style={{ width: '100%' }}
          open={edited}
          onClose={handleSnackBarClose}
          autoHideDuration={5000}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Profile Successfully Updated</span>}
        />
      }
      <ProfileInfoHeader>Profile</ProfileInfoHeader>
      <UserInforForm id='user-profile-form' onSubmit={submitUpdatedProfile}>
        <TextField
          style={{ margin: '10px 10px 10px 0', width: '45%' }}
          label='First Name'
          variant='outlined'
          defaultValue={firstName}
          placeholder={firstName}
          name='firstName'
          onChange={handleFirstName}
        />
        <TextField
          style={{ margin: '10px', width: '45%' }}
          label='Last Name'
          variant='outlined'
          defaultValue={lastName}
          placeholder={lastName}
          name='lastName'
          onChange={handleLastName}
        />
        <TextField
          style={{ margin: '10px 10px 10px 0', width: '93%' }}
          label='Email'
          variant='outlined'
          defaultValue={email}
          placeholder={email}
          name='email'
          fullWidth
          onChange={handleEmail}
        />
        <Select
          isDisabled
          options={titleTypes}
          placeholder={title}
          styles={customStyles}
        />
        <TextField
          style={{ margin: '10px 10px 10px 0', width: '93%' }}
          label='ID'
          variant='outlined'
          defaultValue={personId}
          disabled />
      </UserInforForm>
      <ButtonContainer>
        <Button form='user-profile-form' disabled={lName || fName || newEmail ? false : true} style={buttonStyles} size='large' variant="contained" color="primary" type='submit' >Submit</Button>
        <Button size='small' color="primary" onClick={showPasswordModal} >Change Password</Button>
      </ButtonContainer>
      {
        showModal
        &&
        <ChangePasswordModal
          showPasswordModal={showPasswordModal}
          showModal={showModal}
          />
      }
    </UserProfileInfoContainer>
  );
};

const UserProfileInfoContainer = styled.div`
  height: 450px;
  min-height: 50%;
  color: black;
  background-color: ${colors.white};
  border-radius: 5px;
  padding: 15px 0;
  box-shadow: 3px 5px 8px ${colors.blackShadow};
  `

const ProfileInfoHeader = styled.div`
    font-size: 24px;
    padding: 0 0 15px 20px;
    border-bottom: 1px solid ${colors.lineBreakGray};
`
const UserInforForm = styled.form`
  padding: 15px 20px;
`


const ButtonContainer = styled.div`
  padding: 20px;
  border-top: 1px solid ${colors.lineBreakGray};
`

const mapDispatch = { updateUserThunk }

const UserProfileConnectContainer = connect(null, mapDispatch)(UserProfileInfo)

export default UserProfileConnectContainer;

// const mapState = state => {
//   return {
//     user: state.user,
//     team: state.team,
//     teamMates: state.teamMates
//   }
// }


// const UserProfileContainter = connect(mapState, mapDispatch)(UserProfile)

// export default UserProfileContainter
