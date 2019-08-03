import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideBar from './SideBar'
import store, { fetchAllProjectsAnalytics } from '../store'
import main from './colors'
import UserActiveProjects from './Analytics/user_active_projects';
import UserCompletedTasks from './Analytics/user_completed_tasks';
import UserProjectTypesContainer from './Analytics/user_project_types';
import styled from 'styled-components'
import colors from './colors'


class TeamAnalytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
    // this.projectTypes = this.projectTypes.bind(this)
  }
  componentDidMount() {
    const userId = this.props.user.id;
    store.dispatch(fetchAllProjectsAnalytics(userId));
  }

//   projectTypes(projectsArr) {
//   let inProcess = 0;
//   let complete = 0;
//   for (let i = 0; i < projectsArr.length; i++) {
//     if (projectsArr[i].status === "Complete") {
//       complete += 1;
//     } else if (projectsArr[i].status === "In Process") {
//       inProcess += 1;
//     }
//   }
//   return [
//     {x: 1, y: inProcess},
//     {x: 2, y: complete},
//   ]
// }


render() {
  // let numProjects = this.props.projects.length;
  // console.log("PROJECTS: ", this.props.projects)
  return (
    <div id="completed-projects-container">
      <div className='sidebar-container'>
        <SideBar />
      </div>
      <DashBoardContainer className="container-width">
        <Title>Analytics Dashboard</Title>
        <FirstRowContainer>
          <UserActiveProjects projectAnalytics={this.props.projects[0]}/>
          <UserCompletedTasks projectAnalytics={this.props.projects[0]}/>
        </FirstRowContainer>

        <UserProjectTypesContainer projectAnalytics={this.props.projects[0]} />
      </DashBoardContainer>

    </div>
  )
}
}

const Title = styled.div`
  text-align: left;
  font-size: 36px;
  margin: 30px;
`

const DashBoardContainer = styled.div`
  background-color: ${colors.dashboardGray};
  height: 100vh;
  width: 100%;
  margin: auto auto 10% auto;
  overflow-y: auto;
`

const FirstRowContainer = styled.div`
  display: flex;
  flex-direction: space-between
`

const mapState = state => {
  return {
    user: state.user,
    team: state.team,
    companies: state.companies,
    projects: state.projects
  }
}

const mapDispatch = { fetchAllProjectsAnalytics }

const TeamAnalyticsContainer = connect(mapState, mapDispatch)(TeamAnalytics)

export default TeamAnalyticsContainer
