import React, { Component } from 'react';
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
import Select from 'react-select';
import moment from 'moment';



let filter_period = [
  {
    label: 'this Week',
    value: 'this-week'
  },
  {
    label: 'last Week',
    value: 'last-week'
  },
  {
    label: 'this Month',
    value: 'this-month'
  },
  {
    label: 'this Quarter',
    value: 'this-quarter'
  },
]



class UserCreatedProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterLabel: "this Week",
      completedTasks: 0
    }
    this.filterCompletedProjects = this.filterCompletedProjects.bind(this)
  }


  filterCompletedProjects(val, action, projects) {
    this.setState({
      filterLabel: val.label
    })
    let count = 0
    switch (val.value) {
      case 'this-week':
        let thisWeek = moment().week()
        projects.map(project => {
          if (moment(project.updatedAt).week() == thisWeek) {
            count++
          }
        })
        break;
      case 'last-week':
        let lastWeek = (moment().week() - 1)
        projects.map(project => {
          if (moment(project.updatedAt).week() == lastWeek) {
            count++
          }
        })
        break;
      case 'this-month':
        let currentMonth = moment().month()
        projects.map(project => {
          if (moment(project.updatedAt).month() == currentMonth) {
            count++
          }
        })
        break;
      case 'last-month':
        let lastMonth = (moment().month() - 1)
        projects.map(project => {
          if (moment(project.updatedAt).month() == lastMonth) {
            count++
          }
        })
        break;
      case 'this-quarter':
        let thisQuarter = (moment().quarter())
        projects.map(project => {
          if (moment(project.updatedAt).quarter() == thisQuarter) {
            count++
          }
        })
        break;
      default:
        console.log("DEFAULT ----> None Selected")
        break;
    }
    return this.setState({
      completedTasks: count
    })
  }

  render() {
    console.log("PROPS: ", this.props)
    let activeTasks = this.props.projectAnalytics ? this.props.projectAnalytics.activeTasks ? this.props.projectAnalytics.activeTasks : null : null;
    let projects = this.props.projectAnalytics ? this.props.projectAnalytics.projects ? this.props.projectAnalytics.projects : null : null;
    let initialSelectedValue = 'this Week';
    // let filterCompletedProjects = (projects) => {
    //   console.log("HERE: , ", projects)
    //   let count = 0

    // }


    const customStyles = {
      control: (styles, state) => ({ ...styles, border: `${state.isFocused ? 'none' : 'none'}`, width: '250px' }),
      singleValue: (styles) => ({ ...styles, paddingBottom: '8px', color: `${colors.mainTeal}`}),
      placeholder: (styles) => ({ ...styles, paddingBottom: '8px', color: `${colors.mainTeal}`})
    }

    const IndicatorSeparator = () => {
      return null;
    }

    const DropdownIndicator = () => {
      return null
    }

    return (
      <CreateProjectsWrapper>
        {
          this.props.projectAnalytics
            ?
            <TotalOpenProjectsContainer>
              <TotalProjectsTitle>
                Active Tasks
              </TotalProjectsTitle>
              {
                activeTasks
                &&
                <TotalProjects>
                  {activeTasks}
                </TotalProjects>
              }
            </TotalOpenProjectsContainer>
            :
            <TotalOpenProjectsContainer>
              Loading...
        </TotalOpenProjectsContainer>
        }
        <TotalCompletedProjectsContainer>
          <CompletedProjectsWrapper>
            <TotalProjectsTitle>
              Tasks you've completed
            </TotalProjectsTitle>
            <Select
              name="timeFilter"
              options={filter_period}
              onChange={(val) => this.filterCompletedProjects(val, "select-option", projects)}
              components={{ DropdownIndicator, IndicatorSeparator }}
              placeholder={this.state.filterLabel}
              closeMenuOnSelect={true}
              isMulti={false}
              isSearchable={false}
              styles={customStyles}
            />
          </CompletedProjectsWrapper>


          {
            activeTasks
            &&
            <TotalProjects>
              {this.state.completedTasks}
            </TotalProjects>
          }
        </TotalCompletedProjectsContainer>
      </CreateProjectsWrapper>
    )
  }
}

const CreateProjectsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between
  margin: 40px;
`

const TotalOpenProjectsContainer = styled.div`
  width: 30%;
  color: black;
  font-size: 40px;
  background-color: ${colors.white};
  border-radius: 10px;
  box-shadow: 5px 10px 8px ${colors.blackShadow};
`

const TotalProjectsTitle = styled.div`
  font-size: 36px;
  width: 400px;
`

const TotalProjects = styled.div`
  font-size: 60px;
`

const TotalCompletedProjectsContainer = styled.div`
  margin: 0 10% 0 50px;
  width: 800px;
  color: black;
  font-size: 40px;
  background-color: ${colors.white};
  border-radius: 10px;
  box-shadow: 5px 10px 8px ${colors.blackShadow};
  display: flex;
  flex-direction: column
`

const CompletedProjectsWrapper = styled.div`
  display: flex;
  justify-content: center
`

const CompleteProjectsFilter = styled.select`
  color: red;
`





export default UserCreatedProjects

