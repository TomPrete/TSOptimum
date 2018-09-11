import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideBar from './SideBar'
import store, { fetchAllUserProjects, submitCompletedProject } from '../store'


class TeamAnalytics extends Component {
  constructor(props) {
    super(props);
    this.state = {

      redirect: false
    }
  }


  render() {
    let numProjects = this.props.projects.length;
    return (
      <div id="completed-projects-container">
        <div className='sidebar-container'>
          <SideBar />
        </div>
        <div className="container-width">
          <h1>Number of Projects: {numProjects}</h1>

        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    team: state.team,
    companies: state.companies,
    projects: state.projects
  }
}

const mapDispatch = { submitCompletedProject, fetchAllUserProjects }

const TeamAnalyticsContainer = connect(mapState, mapDispatch)(TeamAnalytics)

export default TeamAnalyticsContainer
