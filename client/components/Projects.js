import React, { Component } from 'react';
import { Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import SideBar from './SideBar';
import store, { fetchUserProjects } from '../store'
// import AddNewUserContainer from '.';
// import store from '../store;'


class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      projectType: "",
      officer: "",
      analyst: "",
      dueDate: "",
      status: "In Process",
      notes: "",
      newProject: false,
      followUp: false,
      redirect: false
    }

  }

 componentWillReceiveProps(nextProps) {
    console.log("USER NAME: ", nextProps.user.name)
    console.log("USER TITLE: ", nextProps.user.title)
    const name = nextProps.user.name
    const title = nextProps.user.title
    const gettingAllUserProjects = fetchUserProjects(name, title)
    store.dispatch(gettingAllUserProjects)
  }


  render() {
    // console.log("THIS STATE: ", this.state)

    return (
      <div id="projects-container">
        <label>THESE ARE THE USER PROJECTS</label>
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

const mapDispatch = { fetchUserProjects }

const ProjectsContainter = connect(mapState, mapDispatch)(Projects)

export default ProjectsContainter
