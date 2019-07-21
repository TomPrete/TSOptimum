import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideBar from './SideBar'
import store, { fetchAllUserProjectsAnalytics } from '../store'
import main from './colors'
import { XYPlot, VerticalBarSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';
import StyledUserCreatedProjects from './Analytics/user_created_projects'
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
    store.dispatch(fetchAllUserProjectsAnalytics(userId));
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
  console.log("PROJECTS: ", this.props.projects)
  return (
    <div id="completed-projects-container">
      <div className='sidebar-container'>
        <SideBar />
      </div>
      <DashBoardContainer className="container-width">
        <Title>Analytics Dashboard</Title>
        <StyledUserCreatedProjects projectAnalytics={this.props.projects[0]}/>
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
const mapState = state => {
  return {
    user: state.user,
    team: state.team,
    companies: state.companies,
    projects: state.projects
  }
}

const mapDispatch = { fetchAllUserProjectsAnalytics }

const TeamAnalyticsContainer = connect(mapState, mapDispatch)(TeamAnalytics)

export default TeamAnalyticsContainer
