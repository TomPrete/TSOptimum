import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AdminSideBar from './AdminSideBar'
import store, { fetchAllUsers } from '../store'
import users from '../store/users';




const AdminTeams = (props) => {
  // const { onSelectAllClick, order, orderBy, numSelected, rowCount } = props;
  // const users = props.users


  return (
    <div id="completed-projects-container">
      <div className='sidebar-container'>
        <AdminSideBar />
      </div>
      <p>
        HERE ARE YOUR TEAMS
        </p>
    </div>
  )
}


const mapState = state => {
  return {
    user: state.user,
    users: state.users
  }
}


const mapDispatch = { fetchAllUsers }


const AdminTeamsContainer = connect(mapState, mapDispatch)(AdminTeams)

export default AdminTeamsContainer
