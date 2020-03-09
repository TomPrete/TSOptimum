import React, { Component } from 'react';
import { Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import AddNewUserContainer from '.';
import SideBar from '../SideBar'
import PersistantDrawer from '../PersistantDrawer'
import ChangePasswordModal from '../Modals/ChangePasswordModal.js'
import store, { updateUserThunk } from '../../store'
import ProfileImage from './ProfileImage';
import UserProfileInfo from './UserProfileInfo';


class UserProfile extends Component {

  constructor(props) {

    super(props);
    this.state = {
      editProfile: false,
      userId: null
    }
    // this.filterTeamMates = this.filterTeamMates.bind(this)
    this.updateProfile = this.updateProfile.bind(this)
    this.submitUpdatedProfile = this.submitUpdatedProfile.bind(this)
    this.showChangePasswordModal = this.showChangePasswordModal.bind(this)

  }

  // filterTeamMates(teamMates) {
  //   let teamMembers = []
  //   teamMates.filter(user => {
  //     if (user.id !== this.props.user.id) {
  //       teamMembers.push(user)
  //     }
  //   })
  //   return teamMembers
  // }

  updateProfile() {
    if (this.state.editProfile === false) {
      this.setState({
        editProfile: true
      })
    } else {
      this.setState({
        editProfile: false
      })
    }
  }


  showChangePasswordModal(user) {
    if (!this.state.userId) {
      this.setState({
        userId: user
      })
    } else {
      this.setState({
        userId: null
      })
    }
  }

  async submitUpdatedProfile(e) {
    e.preventDefault()
    let firstName = e.target.firstName.value || this.props.user.firstName
    let lastName = e.target.lastName.value || this.props.user.lastName
    let email = (e.target.email.value.length > 0 && e.target.email.value.includes("@")) ? e.target.email.value : this.props.user.email
    let id = this.props.user.id
    this.props.updateUserThunk(id, firstName, lastName, email)
    window.location.reload()
  }

  render() {
    const { firstName, lastName, email, title, personId, isAdmin } = this.props.user
    return (
      <div id='user-profile-container'>
        <div className='sidebar-container'>
          <SideBar />
          {/*<PersistantDrawer />*/}
        </div>
        <div id='user-profile'>
          <h1>My Profile Settings</h1>
          <ProfileImage {...this.props.user}/>
          <UserProfileInfo {...this.props.user} />
        </div>
      </div>
    )
  }




}

const mapState = state => {
  return {
    user: state.user,
    team: state.team,
    teamMates: state.teamMates
  }
}

const mapDispatch = { updateUserThunk }

const UserProfileContainter = connect(mapState, mapDispatch)(UserProfile)

export default UserProfileContainter
