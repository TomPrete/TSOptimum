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
    let userId = this.props.user.personId
    let teamId = this.props.user.teamId
    return (
      <div id="sidebar-container">
        <p className="sidebar-header">Analytics</p>
        <Link to={`/user/${userId}/team/${teamId}/analytics`}><div className='sidebar-links'>Team Analytics</div></Link>
        <p className="sidebar-header">Reports</p>

          <Link to={`/user/${userId}/completed_projects`}><div className='sidebar-links'>Completed Projects</div></Link>


          <Link to={`/user/${userId}/created_projects`}><div className='sidebar-links'>Created Projects</div></Link>

          <Link to={`/user/${userId}/board`}><div className="myboard-title">My Board</div></Link>
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
