import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { submitCompletedProject, removeUserProject, fetchInProcessUserProjects } from '../store'
import ProjectModal from './ProjectModal.js'



class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inProcessProjects: null,
      redirect: false,
      projectId: false,
      loading: true
    }
    this.showProjectModal = this.showProjectModal.bind(this)
    this.clickOutside = this.clickOutside.bind(this)
    // this.sortFunction = this.sortFunction.bind(this)
  }



  async componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1500)
    const getAllUserProjects = await fetchInProcessUserProjects(this.props.user.id)
    store.dispatch(getAllUserProjects)
    window.addEventListener('click', this.clickOutside)
  }


  // componentWillUnmount()


  componentWillReceiveProps(nextProps) {
    const userProjects = nextProps.projects
    if (userProjects.length > 0) {
      this.setState({
        inProcessProjects: userProjects
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
      this.setState({
        projectId: null
      })

    }
  }


  render() {
    const project = this.state.projectId

    return (
      <div id="projects-container" >
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
          this.state.inProcessProjects !== null ? this.state.inProcessProjects.map(project => {
            return (
              <div key={project.projectId} >
                <div>
                  <div id="queue-list" >
                    <li className="user-queue" onClick={() => this.showProjectModal(project.projectId)}>{project.name}</li>
                    <li className="user-queue" onClick={() => this.showProjectModal(project.projectId)}>{project.projectType}</li>
                    <li className="user-queue" onClick={() => this.showProjectModal(project.projectId)}>{project.officer}</li>
                    <li className="user-queue" onClick={() => this.showProjectModal(project.projectId)}>{project.status}</li>
                    <li className="user-queue" onClick={() => this.showProjectModal(project.projectId)}>{project.dueDate}</li>
                    <textarea className="user-notes" placeholder={project.notes} onClick={() => this.showProjectModal(project.projectId)} readOnly />
                    <div className="queue-complete">
                      <button type='button' key={project.projectId} value={project.projectId} onClick={() => this.props.submitCompletedProject(project.projectId)} className='complete-btn'>Complete</button>
                      <button className='edit-btn' onClick={() => this.showProjectModal(project.projectId)} >Edit</button>
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
              <ProjectModal projectId={this.state.projectId} showProjectModal={this.showProjectModal} />
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
    teamMates: state.teamMates,
    companies: state.companies,
    projects: state.projects
  }
}

const mapDispatch = { submitCompletedProject, removeUserProject, fetchInProcessUserProjects }

const ProjectsContainter = connect(mapState, mapDispatch)(Projects)

export default ProjectsContainter
