import React, { Component } from 'react';
import { Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SideBar from './SideBar';
import Projects from './Projects'
import store, { fetchUsers, fetchUserTeam, me, fetchAllCompanies, createNewProject, fetchUserProjects, fetchAllProjects } from '../store'
// import AddNewUserContainer from '.';
// import store from '../store;'


class UserBoard extends Component {
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
      showOpenProjects: false,
      followUp: false,
      redirect: false
    }

    this.inputProjectName = this.inputProjectName.bind(this);
    this.inputProjectType = this.inputProjectType.bind(this);
    this.inputTsoName = this.inputTsoName.bind(this);
    this.inputTsaName = this.inputTsaName.bind(this);
    this.inputStatus = this.inputStatus.bind(this);
    // this.inputDueDate = this.inputDueDate.bind(this);
    this.inputNotes = this.inputNotes.bind(this);
    this.inputDueDate = this.inputDueDate.bind(this)
    this.handleProjectSubmit = this.handleProjectSubmit.bind(this)
    this.enableAllOpenProjects = this.enableAllOpenProjects.bind(this)
    // this.handleCompleteSubmit = this.handleCompleteSubmit.bind(this)
    this.enableNewProjectFunction = this.enableNewProjectFunction.bind(this)
    this.sortCompanies = this.sortCompanies.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.followUp = this.followUp.bind(this)
    this.handleGetProjects = this.handleGetProjects.bind(this)
  }

  enableNewProjectFunction() {
    if (this.state.newProject === false) {
      this.setState({
        newProject: true,
      })

    } else {
      this.setState({
        newProject: false,
      })
    }
  }

  enableAllOpenProjects() {
    if (this.state.showOpenProjects === false) {
      this.setState({
        showOpenProjects: true,
      })

    } else {
      this.setState({
        showOpenProjects: false,
      })
    }
  }

  followUp() {
    if (this.state.followUp === false) {
      this.setState({
        followUp: true
      })
    } else {
      this.setState({
        followUp: false,
      })
    }
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.user.teamId && (nextProps.companies.length === undefined && this.props.companies.length === undefined)) {
      const userTeamId = nextProps.user.teamId
      const userName = nextProps.user.name
      const userTitle = nextProps.user.title
      const fetchTeam = await fetchUserTeam(userTeamId)
      store.dispatch(fetchTeam)
    } else {
      console.log("ERROR GETTING_USER_TEAM")
    }
  }

  inputProjectName(e) {
    this.setState({
      name: e.target.value
    })
  }

  inputProjectType(e) {
    this.setState({
      projectType: e.target.value,
    })
  }

  inputTsoName(e) {
    this.setState({
      officer: e.target.value
    })
  }

  inputTsaName(e) {
    this.setState({
      analyst: e.target.value
    })
  }

  inputStatus(e) {
    this.setState({
      status: e.target.value
    })
  }

  inputNotes(e) {
    this.setState({
      notes: e.target.value
    })
  }

  inputDueDate(e) {
    this.setState({
      dueDate: e.target.value
    })
  }

  handleDueDateChange = (evt) => this.setState({ departure: evt.target.value })

  handleProjectSubmit(e) {
    e.preventDefault()
    this.props.createNewProject(this.state.name, this.state.projectType, this.state.officer, this.state.analyst, this.state.status, this.state.dueDate, this.state.notes, this.props.user.id)
    this.setState({
      redirect: true
    })
  }

  sortCompanies() {
    const companies = this.props.companies.sort(function (a, b) {
      var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
      if (nameA < nameB)
        return -1
      if (nameA > nameB)
        return 1
      return 0;
    })
  }


  async handleOnClick() {
    await this.sortCompanies()
    await this.enableNewProjectFunction()

  }

  async handleGetProjects() {
    await this.enableAllOpenProjects()
  }

  render() {
    let user = this.props.user

    return (
      <div id="user-board-container">
        <div className='sidebar-container'>
          <SideBar />
        </div>
        <div id="new-project-container">
          {
            this.state.newProject === false ?
              <div className='new-project-button-container'>
                <button onClick={this.handleOnClick} className='new-project-button'>+ New Project</button>
              </div>
              :
              <div className='new-project-button-container'>
                <button onClick={this.enableNewProjectFunction} className='new-project-button'>Hide</button>
              </div>
          }
          <div className='show-project-form'>
            {
              this.state.newProject === true ?
                <div className='project-form'>
                  <div id="label-project">
                    <label >CREATE NEW PROJECT BELOW</label>
                  </div>
                  <div id="form-container">
                    <form onSubmit={this.handleProjectSubmit} className="new-project-form" id="project-form">
                      <input value={this.state.name} onChange={this.inputProjectName} type="text" name="search" list="companyList" className="select-company" placeholder="Company Name" required />
                      <datalist id="companyList">
                        {
                          this.props.companies.map(company =>
                            <option key={company.id} value={company.name} required>{company.name}</option>)
                        }
                      </datalist>
                      <select onChange={this.inputProjectType} className="select-type" required >
                        <option>Select type</option>
                        <option value="Client Call">Client Call</option>
                        <option value="Client Inquire">Client Inquiry</option>
                        <option value="Client Issue">Client Issue</option>
                        <option value="Exception Pricing">Exception Pricing</option>
                        <option value="Implementation Request">Implementation Request</option>
                        <option value="Pricing Proforma">Pricing Proforma</option>
                        <option value="Refund Request">Refund Request</option>
                        <option value="RFP">RFP</option>
                        <option value="TMR">TMR</option>
                        <option value="Special Project">Special Project</option>
                      </select>
                      <select onChange={this.inputTsoName} className="select-tso" >
                        <option>Select TSO</option>
                        {
                          this.props.team.length > 0 ? this.props.team.map(users => {
                            if (users.title === "Treasury Solutions Officer") {
                              return <option key={users.id} value={users.name} required>{users.name}</option>
                            }
                          })
                            :
                            null
                        }
                      </select>
                      <select onChange={this.inputTsaName} className="select-tsa" >
                        <option>Select TSA</option>
                        {
                          this.props.team.length > 0 ? this.props.team.map(users => {
                            if (users.title === "Treasury Solutions Analyst") {
                              return <option key={users.id} value={users.name} required>{users.name}</option>
                            }
                          })
                            :
                            null
                        }
                      </select>
                      <select onChange={this.inputStatus} defaultValue="In Process" className="select-status" required >
                        <option value="In Process">In Process</option>
                        <option value="Complete">Complete</option>
                      </select>
                      <input
                        required
                        name="departure"
                        type="date"
                        onChange={this.inputDueDate}
                        className="select-date"
                      />
                      {/*<input className="input-startDate" placeholder={ currentDate() } />*/}
                      {/*<input onChange={this.inputDueDate} className="input-dueDate" placeholder="Due Date" type="date"/>*/}
                      <div className="notes-container">
                        <textarea value={this.state.notes} onChange={this.inputNotes} className="notes" placeholder="Notes:" />
                        <div className="follow-up">

                          <div>
                            <h4 className="follow-up-text">Follow up date?</h4>
                          </div>
                          <div className="follow-up-toggle-switch">
                            <label className="switch">
                              <input type="checkbox" onClick={this.followUp} />
                              <span className="slider round"></span>
                            </label>
                          </div>
                          <div className="follow-up-date">
                            <input
                              disabled={!this.state.followUp}
                              name="departure"
                              type="date"
                              onChange={this.handleDueDateChange}
                              className="select-date"
                            />
                            {/*
                              this.state.followUp === true ?
                                <input
                                  required
                                  name="departure"
                                  type="date"
                                  onChange={this.handleDueDateChange}
                                  className="select-date"
                                /> : ''
                            */}
                          </div>
                        </div>
                      </div>
                    </form>
                    <div className="div-submit">
                      <button className="project-submit" form="project-form" type='submit'>Create New Project</button>
                    </div>
                  </div>
                </div>
                : ""
            }
          </div>
          <div>
            {
              this.state.showOpenProjects === false ?
                <div className='new-project-button-container'>
                  <button onClick={this.handleGetProjects} className='new-project-button'>Show Open Projects</button>
                </div>
                :
                <div className='new-project-button-container'>
                  <button onClick={this.enableAllOpenProjects} className='new-project-button'>Hide Open Projects</button>
                </div>
            }
            {this.state.showOpenProjects === true ? <Projects />
              :
              null
            }
          </div>
        </div>

      </div>
    )
  }
}

//<Link className='nav-links' to={`/user/${user.personId}/projects`}>Your Projects</Link>

const mapState = state => {
  return {
    user: state.user,
    team: state.team,
    companies: state.companies,
    projects: state.projects
  }
}

const mapDispatch = { fetchUserTeam, createNewProject, fetchUserProjects }

const UserBoardContainter = connect(mapState, mapDispatch)(UserBoard)

export default UserBoardContainter
