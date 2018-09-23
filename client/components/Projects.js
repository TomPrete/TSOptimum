import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { submitCompletedProject, removeUserProject } from '../store'
import ProjectModal from './ProjectModal.js'



class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inProcessProjects: null,
      redirect: false,
      projectId: false
    }
    this.showModal = this.showModal.bind(this)
    this.clickOutside = this.clickOutside.bind(this)
  }



  componentDidMount() {
    const userProjects = this.props.projects
    if (userProjects.length > 0) {
      const inProcessProjects = userProjects.filter(project => {
        return project.status === "In Process"
      })

      if (inProcessProjects.length > 0) {
        this.setState({
          inProcessProjects: inProcessProjects
        })
      }
    }
    window.addEventListener('click', this.clickOutside)
  }

  componentWillReceiveProps(nextProps) {
    const userProjects = nextProps.projects
    if (userProjects.length > 0) {
      const inProcessProjects = userProjects.filter(project => {
        return project.status === "In Process"
      })
      if (inProcessProjects.length > 0) {
        this.setState({
          inProcessProjects: inProcessProjects
        })
      }
    }
  }

  showModal(project) {
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

  async clickOutside(e) {
    const modal = document.getElementById('modal-component')
    if (e.target === modal) {
      await this.setState({
        projectId: null
      })
      store.dispatch(removeUserProject())
    }
  }


  render() {
    const project = this.state.projectId
    return (
      <div id="projects-container">
        <div id='column-list'>
          <p className="column-titles">Company</p>
          <p className="column-titles">Type</p>
          <p className="column-titles">TSO</p>
          <p className="column-titles">TSA</p>
          <p className="column-titles">Due Date</p>
          <p className="column-notes">Notes</p>
          <p className="column-action">Action</p>
        </div>
        {/*<label>THESE ARE THE USER PROJECTS</label>*/}
        {
          this.state.inProcessProjects !== null ? this.state.inProcessProjects.map(project => {
            return (
              <div key={project.projectId} >
                <div>
                  <div id="queue-list" >
                    <li className="user-queue" onClick={() => this.showModal(project.projectId)}>{project.name}</li>
                    <li className="user-queue" onClick={() => this.showModal(project.projectId)}>{project.projectType}</li>
                    <li className="user-queue" onClick={() => this.showModal(project.projectId)}>{project.officer}</li>
                    <li className="user-queue" onClick={() => this.showModal(project.projectId)}>{project.status}</li>
                    <li className="user-queue" onClick={() => this.showModal(project.projectId)}>{project.dueDate}</li>
                    <textarea value="" className="user-notes" placeholder={project.notes} />
                    <div className="queue-complete">
                      <button type='button' key={project.projectId} value={project.projectId} onClick={() => this.props.submitCompletedProject(project.projectId)} className='complete-btn'>Complete</button>
                      <button className='edit-btn' onClick={() => this.showModal(project.projectId)} >Edit</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
            :
            <div >You have no open projects!</div>
        }

        {
          this.state.projectId
            ?
            <div id='modal-component'>
              <ProjectModal projectId={this.state.projectId} showModal={this.showModal} />
            </div>
            :
            null
        }
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

const mapDispatch = { submitCompletedProject, removeUserProject }

const ProjectsContainter = connect(mapState, mapDispatch)(Projects)

export default ProjectsContainter
