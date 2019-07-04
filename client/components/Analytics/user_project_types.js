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
  const chartJS = {
    labels: [
      'Client Inquire',
      'Client Issue',
      'Exception Pricing',
      'Implementation Request',
      'Pricing Proforma',
      'RFP',
      'Refund Request'
    ],
    datasets: [
      {
        data: [
          `${proj ? proj['Client Inquire'] : proj}`,
          `${proj ? proj['Client Issue'] : proj}`,
          `${proj ? proj['Exception Pricing'] : proj}`,
          `${proj ? proj['Implementation Request'] : proj}`,
          `${proj ? proj['Pricing Proforma'] : proj}`,
          `${proj ? proj['RFP'] : proj}`,
          `${proj ? proj['Refund Request'] : proj}`
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
      {/*<XYPlot height={300} width={200} color={colors.mainTeal}>
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

const UserProjectTypesContainer = connect(mapState, mapDispatch)(UserProjectTypes)

export default UserProjectTypesContainer
