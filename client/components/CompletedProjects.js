import React, { Component } from 'react';
import { Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SideBar from './SideBar';
import store, { fetchCompletedUserProjects, submitCompletedProject } from '../store'
// import AddNewUserContainer from '.';
// import store from '../store;'


class CompletedProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completedProjects: null,
      redirect: false
    }
    // this.filterProjects = this.filterProjects.bind(this)
    // this.completeProject = this.completeProject.bind(this)
  }



  async componentDidMount() {
    const userProjects = this.props.projects
    if (userProjects.length > 0) {
      const completedProjects = userProjects.filter(project => {
        return project.status === "Complete"
      })
      this.setState({
        completedProjects: completedProjects
      })
    }
    else {
      const fetchAllCompletedUserProjects = await fetchCompletedUserProjects(this.props.user.id)
      store.dispatch(fetchAllCompletedUserProjects)
      console.log("PROPS: ", this.props.projects)
    }

  }

  // async filterProjects() {
  //   const userProjects = this.props.projects
  //   const openProjects = await userProjects.filter(project => {
  //     return project.status === "Completed"
  //   })
  // }



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
          <p className="column-titles">TSA</p>
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
                    <li className="user-queue">{project.name}</li>
                    <li className="user-queue">{project.projectType}</li>
                    <li className="user-queue">{project.officer}</li>
                    <li className="user-queue">{project.status}</li>
                    <li className="user-queue">{project.dueDate}</li>
                    <textarea value="" className="user-notes" placeholder={project.notes} />
                    <div className="queue-complete">
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

const mapDispatch = {submitCompletedProject, fetchCompletedUserProjects}

const CompletedProjectsContainer = connect(mapState, mapDispatch)(CompletedProjects)

export default CompletedProjectsContainer
