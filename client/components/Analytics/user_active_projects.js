import React, { Component } from 'react';
import colors from '../colors'
import styled from 'styled-components'



class UserActiveProjects extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let activeTasks = this.props.projectAnalytics ? this.props.projectAnalytics.activeTasks ? this.props.projectAnalytics.activeTasks : 0 : 0;
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
      </CreateProjectsWrapper>
    )
  }
}

const CreateProjectsWrapper = styled.div`
  margin: 40px;
  height: 125px;
`

const TotalOpenProjectsContainer = styled.div`
  color: black;
  font-size: 40px;
  background-color: ${colors.white};
  border-radius: 5px;
  box-shadow: 3px 5px 8px ${colors.blackShadow};
`

const TotalProjectsTitle = styled.div`
  font-size: 36px;
  width: 400px;
  height: 52px;
`

const TotalProjects = styled.div`
  font-size: 60px;
`





export default UserActiveProjects

