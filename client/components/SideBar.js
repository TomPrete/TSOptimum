import React, { Component } from 'react';
import { Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import AddNewUserContainer from '.';
// import store from '../store;'


class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }



  render() {
    // console.log("USER HOME PAGE: ", this.props)
    let userId = this.props.user.personId
    return (
      <div>
        <h3>THIS IS THE SIDEBAR</h3>
      </div>
    )
  }




}

const mapState = state => {
  return {
    user: state.user,
    teamUsers: state.users,
    companies: state.companies
  }
}

const SideBarContainter = connect(mapState)(SideBar)

export default SideBarContainter
