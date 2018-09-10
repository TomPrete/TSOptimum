import React, { Component } from 'react';
import { Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SideBar from './SideBar';
import store, { fetchAllProjects, fetchAllUserProjects, submitCompletedProject } from '../store'
// import AddNewUserContainer from '.';
// import store from '../store;'


class AllUserProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {

      redirect: false
    }
    // this.filterProjects = this.filterProjects.bind(this)
    // this.completeProject = this.completeProject.bind(this)
  }



  async componentDidMount() {
    const getAllUserProjects = await fetchAllUserProjects(this.props.user.id)
    store.dispatch(getAllUserProjects)
  }

  // filterProjects() {
  //   const userProjects = this.props.projects
  //   const openProjects = userProjects.filter(project => {
  //     console.log('PROJECT: ', project)
  //     return project.status === "In Process"
  //   })
  // }



  render() {
    // console.log("openProjects: ", openProjects)
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
          <p className="column-titles">TSA</p>
          <p className="column-titles">Due Date</p>
          <p className="column-notes">Notes</p>
          <p className="column-action">Action</p>
        </div>
          {/*<label>THESE ARE THE USER PROJECTS</label>*/}
          {
            this.props.projects.length > 0 ? this.props.projects.map(project => {
              return (
                <div key={project.projectId} >
                  <form>
                    <div id="queue-list">
                      <li className="user-queue">{project.name}</li>
                      <li className="user-queue">{project.projectType}</li>
                      <li className="user-queue">{project.officer}</li>
                      <li className="user-queue">{project.status}</li>
                      <li className="user-queue">{project.dueDate}</li>
                      <textarea value="" className="user-notes" placeholder={project.notes} />
                      <div className="queue-complete">
                        <button type='button' key={project.projectId} value={project.projectId} onClick={() => this.props.submitCompletedProject(project.projectId)} className='complete-btn'>Complete</button>
                        <Link to={`/projects/${project.projectId}`}>
                          <button type='submit' className='edit-btn'>Edit</button>
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              )
            })
              :
              <div>You have no completed projects!</div>

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
