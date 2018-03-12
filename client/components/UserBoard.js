import React, { Component } from 'react';
import { Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SideBar from './SideBar';
import store, { fetchUsers, fetchUserTeam, me, fetchAllCompanies } from '../store'
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
      status: "",
      notes: "",
      newProject: false,
      redirect: false
    }

    this.inputProjectName = this.inputProjectName.bind(this);
    this.inputProjectType = this.inputProjectType.bind(this);
    this.inputTsoName = this.inputTsoName.bind(this);
    this.inputTsaName = this.inputTsaName.bind(this);
    this.inputStatus = this.inputStatus.bind(this);
    // this.inputDueDate = this.inputDueDate.bind(this);
    this.inputNotes = this.inputNotes.bind(this);
    this.handleProjectSubmit = this.handleProjectSubmit.bind(this)
    // this.handleCompleteSubmit = this.handleCompleteSubmit.bind(this)
    this.enableNewProjectFunction = this.enableNewProjectFunction.bind(this)
    this.sortCompanies = this.sortCompanies.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
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

  async componentWillReceiveProps(nextProps) {
    // console.log("THIS PROPS: ", this.props)
    // console.log("NEXT PROPS: ", nextProps)
    if (nextProps.user.teamId && (nextProps.companies.length === undefined && this.props.companies.length === undefined)) {
      const userTeamId = nextProps.user.teamId
      const fetchTeam = await fetchUserTeam(userTeamId)
      store.dispatch(fetchTeam)
    } else {
      console.log("ERROR GETTING_USER_TEAM")
    }

  }

  // async componentDidMount() {
  //   let teamId = await this.props.user.teamId
  //   console.log("TEAM ID: ", teamId)
  //   const fetchTeam = fetchUserTeam(teamId)
  //   store.dispatch(fetchTeam)
  // }

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

  handleDueDateChange = (evt) => this.setState({ departure: evt.target.value })

  handleProjectSubmit(e) {
    e.preventDefault()
    this.props.submitProject(this.state.name, this.state.projectType, this.state.officer, this.state.analyst, this.state.status, this.state.notes)
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

  render() {
    // console.log("Team ", this.props.team)
    // let tso = []
    // console.log("TSOS: ", tso)
    // const companies = this.props.companies.sort(function (a, b) {
    //   var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
    //   if (nameA < nameB)
    //     return -1
    //   if (nameA > nameB)
    //     return 1
    //   return 0;
    // })



    // const tsa = this.props.teamUsers.filter( user => {
    //   return user.title === "Treasury Solutions Analyst";
    // })

    // var currentDate = function() {
    //     return new Date()
    // }
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
          {
            this.state.newProject === true ?
              <div className='project-form'>
                <div id="label-project">
                  <label >Add a new project below</label>
                </div>
                <div id="form-container">
                  <form onSubmit={this.handleProjectSubmit} className="new-project-form" id="project-form">
                    <input value={this.state.name} onChange={this.inputProjectName} type="text" name="search" list="companyList" className="select-company" placeholder="Company Name" />
                    <datalist id="companyList">
                      {
                        this.props.companies.map(company =>
                          <option key={company.id} value={company.name}>{company.name}</option>)
                      }
                    </datalist>
                    <select onChange={this.inputProjectType} className="select-type">
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
                            return <option key={users.id} value={users.name}>{users.name}</option>
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
                            return <option key={users.id} value={users.name}>{users.name}</option>
                          }
                        })
                          :
                          null
                      }
                    </select>
                    <select onChange={this.inputStatus} defaultValue="In Process" className="select-status" >
                      <option value="In Process">In Process</option>
                      <option value="Complete">Complete</option>
                    </select>
                    <input
                      required
                      name="departure"
                      type="date"
                      onChange={this.handleDueDateChange}
                    />
                    {/*<input className="input-startDate" placeholder={ currentDate() } />*/}
                    {/*<input onChange={this.inputDueDate} className="input-dueDate" placeholder="Due Date" type="date"/>*/}
                    <div>
                      <textarea value={this.state.notes} onChange={this.inputNotes} className="notes" placeholder="Notes:" />
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
        {/*<OpenProjects />*/}
      </div>
    )
  }




}

const mapState = state => {
  return {
    user: state.user,
    team: state.team,
    companies: state.companies
  }
}

const mapDispatch = { fetchUserTeam }

const UserBoardContainter = connect(mapState, mapDispatch)(UserBoard)

export default UserBoardContainter
