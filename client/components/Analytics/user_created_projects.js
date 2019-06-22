import React from 'react';
import { connect } from 'react-redux';
// import SideBar from './SideBar'
// import store, { fetchAllUserProjects } from '../store'
import main from '../colors'
// import '../../node_modules/react-vis/dist/example.scss';
import { XYPlot, VerticalBarSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, VerticalRectSeries } from 'react-vis';
import continuousColorLegend from 'react-vis/dist/legends/continuous-color-legend';
import { Divider } from 'semantic-ui-react';
import { Bar } from 'react-chartjs-2';
// import Chart from 'chart.js';


const data = [
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: 3 }
]

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
        borderColor: main.mainTeal,
        borderWidth: 1,
        hoverBackgroundColor: main.mainTeal,
        hoverBorderColor: main.mainTeal
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
    <div>
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
      {/*<XYPlot height={300} width={200} color={main.mainTeal}>
        <VerticalBarSeries
          // data={props.projects !== undefined ? props.projects : data}
          data={props.props}
          style={{ strokeWidth: 1 }}
        />
  </XYPlot>*/}

    </div>
  )
}

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
