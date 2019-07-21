import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import colors from '../colors';
import PropTypes from 'prop-types';

class UserCompletedTasks extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  shouldComponentUpdate(nextProps, nextState) {

  }

  componentWillUpdate(nextProps, nextState) {

  }

  componentDidUpdate(prevProps, prevState) {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <TotalCompletedProjectsContainer>
        <TotalProjectsTitle>
          Tasks you've completed this week
        </TotalProjectsTitle>
        {
          sortedProjects
          &&
          <TotalProjects>
            {sortedProjects[0]}
          </TotalProjects>
        }
      </TotalCompletedProjectsContainer>
    );
  }
}




UserCompletedTasks.propTypes = {

};

const TotalProjectsTitle = styled.div`
  font-size: 36px;
`

const TotalProjects = styled.div`
  font-size: 60px;
`

const TotalCompletedProjectsContainer = styled.div`
  margin: 0 30% 0 50px;
  width: 50%;
  color: black;
  font-size: 40px;
  background-color: ${colors.white};
  border-radius: 10px;
  box-shadow: 5px 10px 8px ${colors.blackShadow};
`

const mapState = state => {
  return {
    user: state.user,
    team: state.team,
    projects: state.projects
  }
}


const UserCompletedTasksContainer = connect(mapState, null)(UserCompletedTasks)

export default UserCompletedTasksContainer;
