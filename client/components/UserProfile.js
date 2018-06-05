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

    }

  }



  render() {
    // console.log("USER HOME PAGE: ", this.props)
    console.log("PROPS: ", this.props)
    let userId = this.props.user.personId
    // let teamId = this.props.user.teamId
    return (
      <div id='user-profile-container'>
        <div className='sidebar-container'>
          <SideBar />
        </div>
        <div id='user-profile'>
          <h1>This is {this.props.user.name}'s profile</h1>
        </div>
      </div>
    )
  }




}

const mapState = state => {
  return {
    user: state.user
  }
}

const UserProfileContainter = connect(mapState)(UserProfile)

export default UserProfileContainter
