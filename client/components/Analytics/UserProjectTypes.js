import React from 'react';
import { connect } from 'react-redux';
// import SideBar from './SideBar'
// import store, { fetchAllUserProjects } from '../store'
import colors from '../colors'
import styled from 'styled-components'
import { projectType } from '../config'
import { getProjectTypeLabel } from './helper_functions'

import Chart from "react-apexcharts";

const UserProjectTypes = ({ projectAnalytics }) => {
  let proj = projectAnalytics ? projectAnalytics.numOfProjects ? projectAnalytics.numOfProjects : null : null;
  let projects = getProjectTypeLabel(projectType)
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

  const apexChart = {
    options: {
      chart: {
        id: "basic-bar",
        dropShadow: {
          enabled: true,
          enabledOnSeries: undefined,
          top: 0,
          left: 0,
          blur: 3,
          color: '#000',
          opacity: 0.35
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000,
          animateGradually: {
            enabled: true,
            delay: 200
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      xaxis: {
        categories: projects
      },
      fill: {
        colors: [colors.mainTeal]
      }
    },
    series: [
      {
        name: "Projects",
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
        ]
      }
    ],
  };



  if (!proj) {
    return <div>Loading...</div>
  }

  return (
    <ProjectTypeContainer>
      {/*<Bar
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
      />*/}
      <Chart
        options={apexChart.options}
        series={apexChart.series}
        animations={apexChart.animations}
        type='bar'
        width='100%'
        height='500'
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
