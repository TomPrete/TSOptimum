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
// import Chart from 'chart.js';
import styled from 'styled-components'


const UserCreatedProjects = ({projectAnalytics}) => {
  let sortedProjects = projectAnalytics ? projectAnalytics.sortedProjects ? projectAnalytics.sortedProjects : null : null;
  const chartJS = {
    labels: ['In Process', 'Completed'],
    datasets: [
      {
        data: [
          `${sortedProjects ? sortedProjects[0] : sortedProjects}`,
          `${sortedProjects ? sortedProjects[1] : sortedProjects}`],
        label: 'In Process/Complete Projects',
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
  return (
    <CreateProjectsWrapper>


    {
      projectAnalytics
      ?
      <TotalOpenProjects>
        <div>
          Open Projects
        </div>
        {
          sortedProjects
          ?
          sortedProjects[0]
          :
          null
        }
      </TotalOpenProjects>
      :
      <TotalOpenProjects>
        Loading...
      </TotalOpenProjects>
    }
      <BarWrapper>
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
      </BarWrapper>
    </CreateProjectsWrapper>
  )
}




const CreateProjectsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between
  margin: 40px;

`

const TotalOpenProjects = styled.div`
  width: 50%;
  color: white;
  font-size: 40px;
  background-color: ${colors.mainTeal};
  border-radius: 40px;
`
const BarWrapper = styled.div`
  align-content: left;
  width: 40%;
  margin-left: 10px
`

const mapState = state => {
  return {
    user: state.user,
    team: state.team,
    projects: state.projects
  }
}

const mapDispatch = {}

const UserCreatedProjectsContainer = connect(mapState, mapDispatch)(UserCreatedProjects)

export default UserCreatedProjectsContainer

