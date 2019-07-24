import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Select from 'react-select';
import moment from 'moment';
import colors from '../colors';
import PropTypes from 'prop-types';





class UserCompletedTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterLabel: "this Week",
      completedTasks: "?"
    }
    this.filterCompletedProjects = this.filterCompletedProjects.bind(this)
  }

  componentWillMount() {

  }

  componentDidMount() {
    console.log("PROPS: ", this.props)
  }

  componentWillReceiveProps(nextProps) {

  }

  // shouldComponentUpdate(nextProps, nextState) {

  // }

  componentWillUpdate(nextProps, nextState) {

  }

  componentDidUpdate(prevProps, prevState) {

  }

  componentWillUnmount() {

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

      //React-Select styling & functionality



  render() {
    let activeTasks = this.props.projectAnalytics ? this.props.projectAnalytics.activeTasks ? this.props.projectAnalytics.activeTasks : null : null;
    let projects = this.props.projectAnalytics ? this.props.projectAnalytics.projects ? this.props.projectAnalytics.projects : null : null;
    let initialSelectedValue = 'this Week';

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
        <CompleteTasksContainer>
            <CompletedTasksText>
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
          </CompletedTasksText>
          {
            activeTasks
            &&
            <TotalProjects>
              {this.state.completedTasks}
            </TotalProjects>
          }
        </CompleteTasksContainer>
      </CreateProjectsWrapper>
    );
  }
}




UserCompletedTasks.propTypes = {

};

const CreateProjectsWrapper = styled.div`
  margin: 40px;
`

const TotalProjectsTitle = styled.div`
  font-size: 36px;
`

const TotalProjects = styled.div`
  font-size: 60px;
`

const CompleteTasksContainer = styled.div`
  color: black;
  font-size: 40px;
  background-color: ${colors.white};
  border-radius: 5px;
  box-shadow: 3px 5px 8px ${colors.blackShadow};
  display: flex;
  flex-direction: column
`

const CompletedTasksText = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 20px;
`

const mapState = state => {
  return {
    projects: state.projects,
  }
}


const UserCompletedTasksContainer = connect(mapState, null)(UserCompletedTasks)

export default UserCompletedTasksContainer;
