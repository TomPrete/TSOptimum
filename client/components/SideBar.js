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
    let teamId = this.props.user.teamId
    return (
      <div>
        <h3 className="sidebar-header">Analytics</h3>
        <Link to={`/user/${userId}/team/${teamId}/analytics`}>Team Analytics</Link>
        <h3 className="sidebar-header">Reports</h3>
        <Link to={`/user/${userId}/completed_projects`}>Completed Projects</Link>
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
