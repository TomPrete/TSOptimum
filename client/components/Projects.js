import React, { Component } from 'react';
import { Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import SideBar from './SideBar';
import store, { fetchAllProjects } from '../store'
// import AddNewUserContainer from '.';
// import store from '../store;'


class Projects extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     name: "",
  //     projectType: "",
  //     officer: "",
  //     analyst: "",
  //     dueDate: "",
  //     status: "In Process",
  //     notes: "",
  //     newProject: false,
  //     followUp: false,
  //     redirect: false
  //   }
  //   this.filterProjects = this.filterProjects.bind(this)
  // }



 componentDidMount() {
    const fetchProjects = fetchAllProjects()
    store.dispatch(fetchProjects)
    // await this.filterProjects()
  }

  async filterProjects() {
    const userProjects = this.props.projects
       const openProjects = await userProjects.filter(project => {
        return project.status === "In Process"
    })
  }



  render() {

    // console.log("THIS PROPS: ", this.props)
    return (
      <div id="projects-container">
      <label>THESE ARE THE USER PROJECTS</label>
      {
        this.props.projects.length > 0 ? this.props.projects.map(project => {
          return (
            <div key={project.projectId} >
            <form>
                <div id="queue-list">
                  <li className="user-queue">{ project.name }</li>
                  <li className="user-queue">{ project.projectType }</li>
                  <li className="user-queue">{ project.officer }</li>
                  <li className="user-queue">{ project.status }</li>
                  <textarea value=""  className="user-notes" placeholder={ project.notes} />
                  <div className="queue-complete">
                  <button type='button' value={project.projectId} onClick={() => this.props.completeProject(project.projectId)} className='complete-btn'>Complete</button>
                  <Link to={`/projects/${project.projectId}`}>
                    <button type='submit' className='edit-btn'>Edit</button>
                  </Link>
                  </div>
                </div>
              </form>
            </div>
          )
        }) : ""

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

const mapDispatch = {  }

const ProjectsContainter = connect(mapState, mapDispatch)(Projects)

export default ProjectsContainter
