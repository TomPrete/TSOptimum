import React from 'react';
import { connect } from 'react-redux';
// import SideBar from './SideBar'
// import store, { fetchAllUserProjects } from '../store'
import colors from '../colors'
// import '../../node_modules/react-vis/dist/example.scss';
import { XYPlot, VerticalBarSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, VerticalRectSeries } from 'react-vis';
import continuousColorLegend from 'react-vis/dist/legends/continuous-color-legend';
import { Divider } from 'semantic-ui-react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components'
import {project_type} from '../config'
import {getProjectTypeLabel} from './helper_functions'


const data = [
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: 3 }
]
// const data = {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//   datasets: [
//     {
//       label: 'My First dataset',
// backgroundColor: 'rgba(255,99,132,0.2)',
// borderColor: 'rgba(255,99,132,1)',
// borderWidth: 1,
// hoverBackgroundColor: 'rgba(255,99,132,0.4)',
// hoverBorderColor: 'rgba(255,99,132,1)',
//       data: [65, 59, 80, 81, 56, 55, 40]
//     }
//   ]
// };

const UserProjectTypes = ({projectAnalytics}) => {
  let proj = projectAnalytics ? projectAnalytics.numOfProjects ? projectAnalytics.numOfProjects : null : null;
  console.log("projectAnalytics: ", projectAnalytics)
  let projects = getProjectTypeLabel(project_type)
  console.log("Projects: ", projects)
  const chartJS = {
    labels: projects,
    datasets: [
      {
        data: [
          `${proj ? proj[projects[0]] : proj}`,
          `${proj ? proj[projects[1]] : proj}`,
          `${proj ? proj[projects[2]] : proj}`,
          `${proj ? proj[projects[3]] : proj}`,
          `${proj ? proj[projects[4]] : proj}`,
          `${proj ? proj[projects[5]] : proj}`,
          `${proj ? proj[projects[6]] : proj}`,
          `${proj ? proj[projects[7]] : proj}`,
          `${proj ? proj[projects[8]] : proj}`,
          `${proj ? proj[projects[9]] : proj}`
        ],
        label: 'Project Types',
        backgroundColor: 'lightblue',
        borderColor: colors.mainTeal,
        borderWidth: 1,
        hoverBackgroundColor: colors.mainTeal,
        hoverBorderColor: colors.mainTeal
      }
    ],
    // options: {
    //   // events: ['click'], //This event will trigger the onClick function
    //   // onClick: done(),
    //   scales: {
    //     yAxes: [{
    //       barThickness: 20,
    //       ticks: {
    //           beginAtZero: true
    //       }
    //   }]
    //   }
    // }
  }
  if (!proj){
    return <div>Loading...</div>
}
  return (
    <ProjectTypeContainer>
      <Bar
        data={chartJS}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }}
      />
    </ProjectTypeContainer>
  )
}

const ProjectTypeContainer = styled.div`
  height: 40%;
`


const mapState = state => {
  return {
    user: state.user,
    team: state.team,
    projects: state.projects
  }
}

const mapDispatch = {}

const UserProjectTypesContainer = connect(mapState, mapDispatch)(UserProjectTypes)

export default UserProjectTypesContainer
