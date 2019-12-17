import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { submitCompletedProject, removeUserProject, fetchInProcessUserProjects, fetchCompletedUserProjects, fetchAllUserProjects } from '../store'
import styled from 'styled-components'

import CircularLoading from './Loading/CircularLoading';
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
      title: 'Tasks',
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
        title: "My Completed Tasks",
        page: 'completed'
      })
    } else if (window.location.pathname.includes('created')) {
      // IF VIEWS ALL CREATED PROJECTS
      const getAllUserProjects = await fetchAllUserProjects(this.props.user.id)
      store.dispatch(getAllUserProjects)
      this.setState({
        title: "All Tasks",
        page: 'created'
      })
    } else {
      // VIEWS ALL OPEN PROJECTS
      const getAllUserProjects = await fetchInProcessUserProjects(this.props.user.id)
      store.dispatch(getAllUserProjects)
      this.setState({
        title: "My Open Tasks",
        page: 'process'
      })
    }
    window.addEventListener('click', this.clickOutside)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.clickOutside)
  }

  componentWillReceiveProps(nextProps) {
    console.log(typeof nextProps.projects)
    const userProjects = nextProps.projects
    if (userProjects.length >= 0) {
      this.setState({
        projects: userProjects
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

  // projectNotesLength(notes) {
  //   if (notes.length > 105) {
  //     return notes.substring(0, 100) + '...';
  //   } else return notes;
  // }

  render() {
    if (this.state.projects === null) {
      return (
        <CircularLoading />
      )
    }
    return (
      <div>
        <ProjectsTitle>
          {this.state.title}
        </ProjectsTitle>
        <Paper>
          <Table aria-label='simple table'>
          <TableHead>
              <TableRow>
                <TableCell className="column-titles">Company</TableCell>
                <TableCell className="column-titles">Type</TableCell>
                <TableCell className="column-titles">TSO</TableCell>
                <TableCell className="column-titles">Status</TableCell>
                <TableCell className="column-titles">Due Date</TableCell>
                <TableCell className="column-notes">Notes</TableCell>
                <TableCell className="column-action">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.state.projects.length > 0 ? this.state.projects.map(project => {
                  return (
                    <TableRow key={project.projectId} id='queue-list'>
                      {/*<div id="queue">*/}
                      {/*<div id="queue-list" >*/}
                      <TableCell onClick={() => this.showProjectModal(project.projectId)}>{project.name}</TableCell>
                      <TableCell onClick={() => this.showProjectModal(project.projectId)}>{project.projectType}</TableCell>
                      <TableCell onClick={() => this.showProjectModal(project.projectId)}>{project.officer}</TableCell>
                      <TableCell onClick={() => this.showProjectModal(project.projectId)}>{project.status}</TableCell>
                      <TableCell onClick={() => this.showProjectModal(project.projectId)}>{project.dueDate}</TableCell>
                      <TableCell className="user-notes" onClick={() => this.showProjectModal(project.projectId)} >{project.notes.length < 75 ? project.notes : project.notes.substring(0, 75) + ' ...'}</TableCell>

                      {/*</div>*/}
                      <TableCell className="queue-complete">
                        {
                          project.status == 'In Process'
                            ?
                            <Button type='button' key={project.projectId} value={project.projectId} onClick={() => this.props.submitCompletedProject(project.projectId)} variant='contained' className='complete-btn'>Complete</Button>
                            :
                            <div>
                              <h3>Finished</h3>
                            </div>
                        }
                        {/*<Button className='edit-btn' onClick={() => this.showProjectModal(project.projectId)} >Edit</Button>*/}
                      </TableCell>
                      {/*</div>*/}
                    </TableRow>
                  )
                })
                  :
                  <TableRow>
                    <TableCell>
                      You have no open tasks!
                    </TableCell>
                  </TableRow>
              }
              </TableBody>
          </Table>
        </Paper>
        {
          this.state.projectId
          &&
          <div id='modal-component'>
            <ProjectModal projectId={this.state.projectId} showProjectModal={this.showProjectModal} type="EDIT TASK" />
          </div>
        }
      </div>
    )
  }
}

const ProjectsTitle = styled.div`
  font-size: 22px;
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
`

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
