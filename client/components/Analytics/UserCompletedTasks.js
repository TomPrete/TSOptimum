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
      completedTasks: null
    }
    this.filterCompletedProjects = this.filterCompletedProjects.bind(this)
  }

  componentWillMount() {

  }

  componentDidMount() {
    let completedTasks = this.props.completeTasks
    this.setState({
      completedTasks: completedTasks
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      completedTasks: nextProps.completeTasks
    })
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("Current STATE: ", this.state.completedTasks)
  //   console.log("NEXT STATE: ", nextState)
  //   if (this.state.completedTasks != nextState.completedTasks) {
  //     this.setState({
  //       completedTasks: nextState.completedTasks
  //     })
  //     console.log("RETURNING TRUE")
  //     return true
  //   }
  //   else return false
  // }

  // componentWillUpdate(nextProps, nextState) {

  // }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log("COMPONENT DID UPDATES: ", prevState)
  // }

  // componentWillUnmount() {

  // }


  filterCompletedProjects(val, action, projects) {
    this.setState({
      filterLabel: val.label,
      filter: action
    })
    let count = 0
    switch (val.value) {
      case 'this-week':
        let thisWeek = moment().week()
        projects.map(project => {
          if (moment(project.completedAt).week() == thisWeek) {
            count++
          }
        })
        break;
      case 'last-week':
        let lastWeek = (moment().week() - 1)
        projects.map(project => {
          if (moment(project.completedAt).week() == lastWeek) {
            count++
          }
        })
        break;
      case 'this-month':
        let currentMonth = moment().month()
        projects.map(project => {
          if (moment(project.completedAt).month() == currentMonth) {
            count++
          }
        })
        break;
      case 'last-month':
        let lastMonth = (moment().month() - 1)
        projects.map(project => {
          if (moment(project.completedAt).month() == lastMonth) {
            count++
          }
        })
        break;
      case 'this-quarter':
        let thisQuarter = (moment().quarter())
        projects.map(project => {
          if (moment(project.completedAt).quarter() == thisQuarter) {
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
    let projects = this.props.allProjects
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
      control: (styles, state) => ({ ...styles, border: `${state.isFocused ? '0' : '0'}`, width: '250px', cursor: 'pointer', boxShadow: `${state.isFocused} ? 0 : 0`}),
      singleValue: (styles) => ({ ...styles, paddingBottom: '8px', color: `${colors.mainTeal}`}),
      placeholder: (styles) => ({ ...styles, paddingBottom: '8px', color: `${colors.mainTeal}`}),
    }

    const IndicatorSeparator = () => {
      return null;
    }

    const DropdownIndicator = () => {
      return null
    }

    // if (!this.props.completeTasks) {
    //   return (
    //     <div>
    //     ...loading
    //   </div>
    //   )

    // }

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
            this.props.allProjects
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
    projects: state.projects.completeTasks,
  }
}


const UserCompletedTasksContainer = connect(mapState, null)(UserCompletedTasks)

export default UserCompletedTasksContainer;
