import React, { Component } from 'react';
import { Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import AddNewUserContainer from '.';
import SideBar from './SideBar'
// import store from '../store;'


class UserProfile extends Component {

  constructor(props) {

    super(props);
    this.state = {
      editProfile: false,
    }
    // this.filterTeamMates = this.filterTeamMates.bind(this)
    this.updateProfile = this.updateProfile.bind(this)
    this.submitUpdatedProfile = this.submitUpdatedProfile.bind(this)
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

  submitUpdatedProfile(e) {
    e.preventDefault()
    let firstName = e.target.firstName.value || this.props.user.firstName
    let lastName = e.target.lastName.value || this.props.user.lastName
    let email = e.target.email.value || this.props.user.email
    console.log("UPDATED: ", firstName, lastName, email)
  }

  render() {

    return (
      <div id='user-profile-container'>
        <div className='sidebar-container'>
          <SideBar />
        </div>
        <div id='user-profile'>
          <h1>My Profile Settings</h1>
          <div>
          {
            !this.state.editProfile
            ?
            <div>
            <h1>Name: {this.props.user.firstName} {this.props.user.lastName}</h1>
            <h2>Email: {this.props.user.email}</h2>
            </div>
            :
            <div>
            <h1>Edit Profile</h1>
            <form onSubmit={this.submitUpdatedProfile} id="update-profile">
            <h1>First Name:
            <input type="text" name="firstName" type="text"
            className="edit-firstName" placeholder={this.props.user.firstName} />
            Last Name:
            <input type="text" name="lastName" type="text"
            className="edit-lastName" placeholder={this.props.user.lastName} /></h1>
            <h1>Email:
            <input type="text" name="email" type="text"
            className="edit-email" placeholder={this.props.user.email} /></h1>
            </form>


            </div>

          }
          </div>

          <hr />
          <h2>Person Number: {this.props.user.personId}</h2>

          <h2>Title: {this.props.user.title}</h2>
          <h2>Team: {this.props.team}</h2>
          {/*<div>
            {
              this.filterTeamMates(this.props.teamMates).length > 0
                ?
                this.filterTeamMates(this.props.teamMates).map(user => {
                  return (
                    <div key={user.id}>
                      <div>
                       <h2>{user.title}: {user.name}</h2>
                      </div>
                    </div>
                  )
                })
                :
                null
            }
          </div>*/}
          <div>
          {
            !this.state.editProfile
            ?
            <button onClick={this.updateProfile}>Edit Profile</button>
            :
            <div>
            <button type="submit" form="update-profile">Save</button>
            <button onClick={this.updateProfile}>Cancel</button>
            </div>
          }

          </div>
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

const UserProfileContainter = connect(mapState)(UserProfile)

export default UserProfileContainter
