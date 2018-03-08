import React, { Component } from 'react';
import { Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import AddNewUserContainer from '.';
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
    return (
      <div>
        <h1>THIS IS {this.props.user.name}'s PROFILE</h1>
        <Link to={`/user/${userId}/board`}>Back to board</Link>
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
