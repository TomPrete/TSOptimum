import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Switch, NavLink, Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import { addNewUser } from '../store'

const AdminSideBar = (props) => {
  let pathName = window.location.pathname
  return (
    <div id="sidebar-container">
    <p className="sidebar-header">Users</p>
    <Link to={`${pathName}/users`}><div className='sidebar-links'>Users</div></Link>
    <p className="sidebar-header">Reports</p>

      <Link to={`/my-completed_projects`}><div className='sidebar-links'>Completed Projects</div></Link>


      <Link to={`/my-created_projects`}><div className='sidebar-links'>Created Projects</div></Link>

      <Link to={`/my-board`}><div className="myboard-title">My Board</div></Link>
  </div>
  )
}



const mapState = state => {
  return {
    user: state.user,
    teamUsers: state.users,
    companies: state.companies
  }
}

const AdminSideBarContainter = connect(mapState)(AdminSideBar)

export default AdminSideBarContainter
