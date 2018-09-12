import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { submitCompletedProject } from '../store'



class ProjectModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {

  }


  render() {
    // const {projectsId} = this.props
    console.log("PROPS: ", this.props.projectId)

    return (
      <div id="projects-modal-container">
        <h1>Project Modal</h1>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    team: state.team,
    companies: state.companies,
    projects: state.projects
  }
}

const mapDispatch = {submitCompletedProject}

const ProjectModalContainer = connect(mapState, mapDispatch)(ProjectModal)

export default ProjectModalContainer
