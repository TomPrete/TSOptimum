import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AdminSideBar from './AdminSideBar'
import AdminUsers from './AdminUsers'


class AdminHome extends Component {

  render() {
    return (
      <div id="completed-projects-container">

        <div className='sidebar-container'>
          <AdminSideBar />
        </div>
        <div className="container-width">
          <div>
            <p>USERS, Teams, Companies, Task Type, etc.</p>
          </div>
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


const mapDispatch = { }


const AdminHomeContainer = connect(mapState, mapDispatch)(AdminHome)

export default AdminHomeContainer
