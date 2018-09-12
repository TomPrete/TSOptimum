import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { submitCompletedProject } from '../store'
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
  }



  componentDidMount() {
    const userProjects = this.props.projects
    if (userProjects.length > 0) {
      const inProcessProjects = userProjects.filter(project => {
        return project.status === "In Process"
      })
      this.setState({
        inProcessProjects: inProcessProjects
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const userProjects = nextProps.projects
    if (userProjects.length > 0) {
      const inProcessProjects = userProjects.filter(project => {
        return project.status === "In Process"
      })
      this.setState({
        inProcessProjects: inProcessProjects
      })
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
                  <div id="queue-list">
                    <li className="user-queue">{project.name}</li>
                    <li className="user-queue">{project.projectType}</li>
                    <li className="user-queue">{project.officer}</li>
                    <li className="user-queue">{project.status}</li>
                    <li className="user-queue">{project.dueDate}</li>
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
          this.state.projectId ? <ProjectModal projectId={this.state.projectId}/> : null
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

const mapDispatch = {submitCompletedProject}

const ProjectsContainter = connect(mapState, mapDispatch)(Projects)

export default ProjectsContainter
