import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { submitCompletedProject, removeUserProject, fetchInProcessUserProjects, fetchCompletedUserProjects, fetchAllUserProjects } from '../store'
import ProjectModal from './ProjectModal.js'
import SideBar from './SideBar'
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: null,
      redirect: false,
      projectId: false,
      loading: true,
      title: 'Projects',
      page: this.props.page
    }
    this.showProjectModal = this.showProjectModal.bind(this)
    this.clickOutside = this.clickOutside.bind(this)
    // this.sortFunction = this.sortFunction.bind(this)
  }



  async componentDidMount() {

    setTimeout(() => this.setState({ loading: false }), 1500)
    if (window.location.pathname.includes('completed')) {
      // IF VIEWS ALL COMPLETED PROJECTS
      const fetchAllCompletedUserProjects = await fetchCompletedUserProjects(this.props.user.id)
      store.dispatch(fetchAllCompletedUserProjects)
      this.setState({
        title: "My Complete Projects",
        page: 'completed'
      })
    } else if (window.location.pathname.includes('created')) {
      // IF VIEWS ALL CREATED PROJECTS
      const getAllUserProjects = await fetchAllUserProjects(this.props.user.id)
      store.dispatch(getAllUserProjects)
      this.setState({
        title: "All Projects",
        page: 'created'
      })
    } else {
      const getAllUserProjects = await fetchInProcessUserProjects(this.props.user.id)
      store.dispatch(getAllUserProjects)
      this.setState({
        title: "My Open Projects",
        page: 'process'
      })
    }

    window.addEventListener('click', this.clickOutside)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.clickOutside)
  }

  componentWillReceiveProps(nextProps) {
    const userProjects = nextProps.projects
    if (userProjects.length > 0) {
      this.setState({
        projects: userProjects
      })
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("nextProps: ", nextProps)

  //   return true
  // }

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

  projectNotesLength(notes) {
    if (notes.length > 105) {
      return notes.substring(0, 100) + '...';
    } else return notes;
  }

  render() {

    return (
      <div>
        <div id="projects-container" >
        <div className="project_title">
        {this.state.title}
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
          <TableBody >
            {
              this.state.projects !== null ? this.state.projects.map(project => {
                return (
                  <TableRow key={project.projectId} id='queue-list'>
                    {/*<div id="queue">*/}
                    {/*<div id="queue-list" >*/}
                    <TableCell onClick={() => this.showProjectModal(project.projectId)}>{project.name}</TableCell>
                    <TableCell onClick={() => this.showProjectModal(project.projectId)}>{project.projectType}</TableCell>
                    <TableCell onClick={() => this.showProjectModal(project.projectId)}>{project.officer}</TableCell>
                    <TableCell onClick={() => this.showProjectModal(project.projectId)}>{project.status}</TableCell>
                    <TableCell onClick={() => this.showProjectModal(project.projectId)}>{project.dueDate}</TableCell>
                    {/*<textarea className="user-notes" placeholder={project.notes} onClick={() => this.showProjectModal(project.projectId)} readOnly />*/}
                    <TableCell className="user-notes" onClick={() => this.showProjectModal(project.projectId)} >{project.notes.length < 75 ? project.notes : project.notes.substring(0, 75) + ' ...'}</TableCell>

                    {/*</div>*/}
                    <TableCell className="queue-complete">
                      {
                        project.status == 'In Process'
                        ?
                        <Button type='button' key={project.projectId} value={project.projectId} onClick={() => this.props.submitCompletedProject(project.projectId)} variant='contained' className='complete-btn'>Complete</Button>
                        :
                        <div>
                         <h2>COMPLETED</h2>
                        </div>
                    }
                      {/*<Button className='edit-btn' onClick={() => this.showProjectModal(project.projectId)} >Edit</Button>*/}
                    </TableCell>
                    {/*</div>*/}
                  </TableRow>
                )
              })
                :
                <span >You have no open projects!</span>
            }
          </TableBody>

          {
            this.state.projectId
              &&
              <div id='modal-component'>
                <ProjectModal projectId={this.state.projectId} showProjectModal={this.showProjectModal} type="EDIT PROJECT"/>
              </div>

          }
        </div>
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

const mapDispatch = { submitCompletedProject, removeUserProject, fetchInProcessUserProjects, fetchCompletedUserProjects, fetchAllUserProjects }

const ProjectsContainter = connect(mapState, mapDispatch)(Projects)

export default ProjectsContainter
