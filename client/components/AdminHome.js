import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AdminSideBar from './AdminSideBar'
import AdminUsers from './AdminUsers'
import companies from '../store/companies';
import team_mates from '../store/team_mates';


class AdminHome extends Component {

  render() {
    console.log("PROPS: ", this.props)
    const {users, teams, companies } = this.props
    return (
      <div id="completed-projects-container">

        <div className='sidebar-container'>
          <AdminSideBar />
        </div>
        <div className="container-width">
          <div>
            <p>USERS:</p>
            <p>TEAMS: </p>
            <p>COMPANIES: </p>
          </div>
        </div>


      </div>
    )
  }
}


const mapState = state => {
  return {
    user: state.user,
    user: state.users,
    companies: state.companies,
    teams: state.teams
  }
}


const mapDispatch = { }


const AdminHomeContainer = connect(mapState, mapDispatch)(AdminHome)

export default AdminHomeContainer
