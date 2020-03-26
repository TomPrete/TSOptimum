import React, { Component } from 'react';
import { Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import AddNewUserContainer from '.';
import SideBar from '../SideBar'
// import PersistantDrawer from '../PersistantDrawer'
import ChangePasswordModal from '../Modals/ChangePasswordModal.js'
import ProfileImage from './ProfileImage';
import UserProfileInfo from './UserProfileInfo';
import styled from 'styled-components'


class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editProfile: false,
      userId: null
    }
    // this.filterTeamMates = this.filterTeamMates.bind(this)
    this.updateProfile = this.updateProfile.bind(this)
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

  render() {
    return (
      <div id='user-profile-container'>
        <div className='sidebar-container'>
          <SideBar />
          {/*<PersistantDrawer />*/}
        </div>
        <UserInfoContainer>
          <ProfileImage {...this.props.user} team={this.props.team}/>
          <UserProfileInfo {...this.props.user} />
        </UserInfoContainer>
      </div>
    )
  }
}

const UserInfoContainer = styled.div`
  display: flex;
  justify-content: row;
  width: 100%;
  margin: 40px;

`

const mapState = state => {
  return {
    user: state.user,
    team: state.team,
    teamMates: state.teamMates
  }
}

const UserProfileContainter = connect(mapState, null)(UserProfile)

export default UserProfileContainter
