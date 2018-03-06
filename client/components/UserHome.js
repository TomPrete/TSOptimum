import React, { Component } from 'react';
import { Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import AddNewUserContainer from '.';
// import store from '../store;'


class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }


  }


  render() {

    // console.log("USER HOME PAGE: ", this.props)
    return (
      <div>
        <h1>THIS IS THE USER HOME PAGE</h1>
      </div>
    )
  }




}

const mapState = state => {
  return {
    user: state.user
  }
}

const UserHomeContainter = connect(mapState)(UserHome)

export default UserHomeContainter
