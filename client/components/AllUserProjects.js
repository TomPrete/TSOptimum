import React, { Component } from 'react';
import { Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SideBar from './SideBar';
import ProjectModal from './ProjectModal.js'
import store, { fetchAllUserProjects, submitCompletedProject, removeUserProject } from '../store'
// import AddNewUserContainer from '.';
// import store from '../store;'


class AllUserProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      projectId: false
    }
    this.showProjectModal = this.showProjectModal.bind(this)
    this.clickOutside = this.clickOutside.bind(this)
  }



  async componentDidMount() {
    if (this.props.user.id) {
      const getAllUserProjects = await fetchAllUserProjects(this.props.user.id)
      store.dispatch(getAllUserProjects)
    }

    window.addEventListener('click', this.clickOutside)
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
      this.setState({
        projectId: null
      })

    }
  }

  render() {
    return (
      <div id="all-user-projects-container">
        <div className='sidebar-container'>
          <SideBar />
        </div>

        <div className="container-width">
        <div>
          <p>All Created Projects</p>
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
            this.props.projects.length > 0 ? this.props.projects.map(project => {
              return (
                <div key={project.projectId} >
                  <div>
                    <div id="queue-list">
                      <li className="user-queue" onClick={() => this.showProjectModal(project.projectId)}>{project.name}</li>
                      <li className="user-queue" onClick={() => this.showProjectModal(project.projectId)}>{project.projectType}</li>
                      <li className="user-queue" onClick={() => this.showProjectModal(project.projectId)}>{project.officer}</li>
                      <li className="user-queue" onClick={() => this.showProjectModal(project.projectId)}>{project.status}</li>
                      <li className="user-queue" onClick={() => this.showProjectModal(project.projectId)}>{project.dueDate}</li>
                      <textarea value="" className="user-notes" placeholder={project.notes} onClick={() => this.showProjectModal(project.projectId)} readOnly/>
                      <div className="queue-complete">
                          <button type="button" className='edit-btn' onClick={() => this.showProjectModal(project.projectId)}>Edit</button>
                      </div>
                    </div>
                  </div>
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

const mapDispatch = { submitCompletedProject, fetchAllUserProjects }

const AllUserProjectsContainer = connect(mapState, mapDispatch)(AllUserProjects)

export default AllUserProjectsContainer
