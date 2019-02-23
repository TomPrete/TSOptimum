import React, { Component } from 'react';
import { Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SideBar from './SideBar';
import ProjectModal from './ProjectModal.js'
import store, { removeUserProject, fetchCompletedUserProjects, submitCompletedProject } from '../store'
// import AddNewUserContainer from '.';
// import store from '../store;'


class CompletedProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completedProjects: null,
      redirect: false,
      projectId: false
    }
    // this.filterProjects = this.filterProjects.bind(this)
    this.showProjectModal = this.showProjectModal.bind(this)
    this.clickOutside = this.clickOutside.bind(this)
    // this.completeProject = this.completeProject.bind(this)
  }



  async componentDidMount() {
      const fetchAllCompletedUserProjects = await fetchCompletedUserProjects(this.props.user.id)
      store.dispatch(fetchAllCompletedUserProjects)

    window.addEventListener('click', this.clickOutside)
  }

  componentWillReceiveProps(nextProps) {
    const completedProjects = nextProps.projects
    if (completedProjects.length > 0 ) {
      this.setState({
        completedProjects: completedProjects
      })
    }
  }

  showProjectModal(project) {
    if (!this.state.projectId) {
      this.setState({
        projectId: project
      })
    } else {
      this.setState({
        projectId: null
      })
    }
  }

  clickOutside(e) {
    const modal = document.getElementById('modal-component')
    if (e.target === modal) {
      // store.dispatch(removeUserProject())
      this.setState({
        projectId: null
      })

    }
  }



  render() {
    return (
      <div id="completed-projects-container">
        <div className='sidebar-container'>
          <SideBar />
        </div>
        <div className="container-width">
        <div>
          <p>All Completed Projects</p>
        </div>
        <div id='column-list'>
          <p className="column-titles">Company</p>
          <p className="column-titles">Type</p>
          <p className="column-titles">TSO</p>
          <p className="column-titles">Status</p>
          <p className="column-titles">Due Date</p>
          <p className="column-notes">Notes</p>
          <p className="column-action">Action</p>
        </div>
        {/*<label>THESE ARE THE USER PROJECTS</label>*/}
        {
          this.state.completedProjects !== null ? this.state.completedProjects.map(project => {
            return (
              <div key={project.projectId} className="project-list" >
                <form>
                  <div id="queue-list">
                    <li className="user-queue" onClick={() => this.showProjectModal(project.projectId)}>{project.name}</li>
                    <li className="user-queue" onClick={() => this.showProjectModal(project.projectId)}>{project.projectType}</li>
                    <li className="user-queue" onClick={() => this.showProjectModal(project.projectId)}>{project.officer}</li>
                    <li className="user-queue" onClick={() => this.showProjectModal(project.projectId)}>{project.status}</li>
                    <li className="user-queue" onClick={() => this.showProjectModal(project.projectId)}>{project.dueDate}</li>
                    <textarea className="user-notes" placeholder={project.notes} onClick={() => this.showProjectModal(project.projectId)} readOnly/>
                    <div className="queue-complete">
                        <button type='button' className='edit-btn' onClick={() => this.showProjectModal(project.projectId)}>Edit</button>
                    </div>
                  </div>
                </form>
              </div>
            )
          })
          :
          <div>You have no completed projects!</div>
        }
        {
          this.state.projectId
            ?
            <div id='modal-component'>
              <ProjectModal projectId={this.state.projectId} showProjectModal={this.showProjectModal} />
            </div>
            :
            null
        }
        </div>
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

const mapDispatch = {submitCompletedProject, fetchCompletedUserProjects}

const CompletedProjectsContainer = connect(mapState, mapDispatch)(CompletedProjects)

export default CompletedProjectsContainer
