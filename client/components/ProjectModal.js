import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { submitCompletedProject, getUserProject, editUserProject, removeUserProject } from '../store'
import AsyncSelect from 'react-select/lib/Async';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';

// import { Calendar } from 'react-calendar'
import styled from 'styled-components'

// <select onChange={this.inputProjectType} className="edit-select-type" >




const project_type = [
  {
    label: 'Client Call',
    value: 'Client Call'
  },
  {
    label: 'Client Inquire',
    value: 'Client Inquire'
  },
  {
    label: 'Client Issue',
    value: 'Client Issue'
  },
  {
    label: 'Exception Pricing',
    value: 'Exception Pricing'
  },
  {
    label: 'Implementation Request',
    value: 'Implementation Request'
  },
  {
    label: 'Pricing Proforma',
    value: 'Pricing Proforma'
  },
  {
    label: 'Refund Request',
    value: 'Refund Request'
  },
  {
    label: 'RFP',
    value: 'RFP'
  },
  {
    label: 'TMR',
    value: 'TMR'
  },
  {
    label: 'Special Project',
    value: 'Special Project'
  }
]

const project_status = [
  {
    label: 'In Process',
    value: 'In Process'
  },
  {
    label: 'Completed',
    value: 'Completed'
  }
]

class ProjectModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      companyName: "",
      projectType: "",
      officer: "",
      analyst: "",
      dueDate: "",
      status: "In Process",
      notes: null,
      dueDate: false,
      followUp: false,
      redirect: false
    }
    this.followUp = this.followUp.bind(this)
    this.inputProjectName = this.inputProjectName.bind(this);
    // this.inputProjectType = this.inputProjectType.bind(this);
    this.inputTsoName = this.inputTsoName.bind(this);
    this.inputTsaName = this.inputTsaName.bind(this);
    // this.inputStatus = this.inputStatus.bind(this);
    this.inputNotes = this.inputNotes.bind(this);
    this.inputDueDate = this.inputDueDate.bind(this)
    // this.removeProject = this.removeProject.bind(this)
    this.handleProjectSubmit = this.handleProjectSubmit.bind(this)
    this.loadOptions = this.loadOptions.bind(this)
    this.filterCompanies = this.filterCompanies.bind(this)
    this.getTreasuryOfficers = this.getTreasuryOfficers.bind(this)
    this.getTreasuryAnalysts = this.getTreasuryAnalysts.bind(this)
    this.getCurrentDate = this.getCurrentDate.bind(this)
  }

  filterCompanies(companyName) {
    return this.props.companies.filter(i =>
      i.label.toLowerCase().includes(companyName.toLowerCase())
    );
  };

  loadOptions(companyName, callback) {
    setTimeout(() => {
      callback(this.filterCompanies(companyName));
    }, 500);
  }

  componentDidMount() {
    store.dispatch(getUserProject(this.props.projectId))
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

  componentWillUnmount() {
    store.dispatch(removeUserProject())

  }

  //**** FUNCTIONS THAT HANDLE CHANGES TO THE INPUT FORM ****/

  inputProjectName(e) {
    const companyName = e.replace(/\W/g, '');
    this.setState({ companyName });
  }

  // inputProjectType(e) {
  //   this.setState({
  //     projectType: e.target.value,
  //   })
  // }

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

  // inputStatus(e) {
  //   this.setState({
  //     status: e.target.value
  //   })
  // }

  getTreasuryOfficers(teamMates) {
    let officers = []
    for (let i = 0; i < teamMates.length; i++) {
      if (teamMates[i].title === "Treasury Solutions Officer") {
        let obj = {};
        obj.label = teamMates[i].name;
        obj.value = teamMates[i].name;
        officers.push(obj)
      }
    }
    return officers
  }

  getTreasuryOfficers(teamMates) {
    let officers = []
    for (let i = 0; i < teamMates.length; i++) {
      if (teamMates[i].title === "Treasury Solutions Officer") {
        let obj = {};
        obj.label = teamMates[i].name;
        obj.value = teamMates[i].name;
        officers.push(obj)
      }
    }
    return officers
  }

  getTreasuryAnalysts(teamMates) {
    let analysts = []
    for (let i = 0; i < teamMates.length; i++) {
      if (teamMates[i].title === "Treasury Solutions Analyst") {
        let obj = {};
        obj.label = teamMates[i].name;
        obj.value = teamMates[i].name;
        analysts.push(obj)
      }
    }
    return analysts
  }

  getCurrentDate() {
    return new Date().toISOString().slice(0,10);
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


  async handleProjectSubmit(e) {
    e.preventDefault()
    let projectId = this.props.project.projectId;
    let name = !e.target.companyName.value ? this.props.project.name : e.target.companyName.value;
    let projectType = e.target.projectType.value || this.props.project.projectType;
    let officer = e.target.officer.value || this.props.project.officer;
    let analyst = e.target.analyst.valu || this.props.project.analyst;
    let status = e.target.projectStatus.value || this.props.project.status;
    let dueDate = !this.state.dueDate ? this.props.project.dueDate : this.state.dueDate;
    let notes = !this.state.notes ? this.props.project.notes : this.state.notes;
    await this.props.editUserProject(projectId, name, projectType, officer, analyst, status, dueDate, notes, this.props.user.id, this.props.user.teamId)
    await store.dispatch(removeUserProject())
    await this.props.showProjectModal()
  }

  render() {
    let officers = this.getTreasuryOfficers(this.props.teamMates)
    let analysts = this.getTreasuryAnalysts(this.props.teamMates)

    return (
      <div id="projects-modal-container">
        <div className='project-modal-header'>
          <label className='project-label'>EDIT PROJECT</label>
          <span className='closeBtn' onClick={() => { this.props.showProjectModal(); this.componentWillUnmount() }}>&times;</span>
        </div>

        <div className='edit-project-form'>
          <div id="edit-form-container">
            <form onSubmit={this.handleProjectSubmit} className="edit-project-form" id="edit-project-form">
              <div>
                {/*<input value={this.state.name} onChange={this.inputProjectName} type="text" name="search" list="companyList" className="edit-select-company" placeholder={this.props.project.name} />
                <datalist id="companyList">
                  {
                    this.props.companies.map(company =>
                      <option key={company.id} value={company.name}>{company.name}</option>)
                  }
                </datalist> */}
                <div className='edit-select'>
                  <p>Company Name:</p>
                  <AsyncSelect
                    name="companyName"
                    loadOptions={this.loadOptions}
                    className="edit-select-company"
                    placeholder={this.props.project.name}
                    cacheOptions
                    onInputChange={this.inputProjectName}
                  // required
                  />
                </div>
                <div className='edit-select' >
                  <p>Project Type: </p>
                  <Select
                    name="projectType"
                    options={project_type}
                    className="edit-select-type"
                    placeholder={this.props.project.projectType}
                    closeMenuOnSelect={true}
                    isMulti={false}
                    isClearable
                  // isSearchable
                  />
                </div>
                <div className='edit-select'>
                  <p>Project Status: </p>
                  <Select
                    name="projectStatus"
                    options={project_status}
                    className="edit-select-status"
                    placeholder={this.props.project.status}
                    closeMenuOnSelect={true}
                    isMulti={false}
                    isClearable

                  />
                </div>
                <div className='edit-select'>
                  <p>Treasury Officer: </p>
                  <Select
                    name="officer"
                    options={officers}
                    className="edit-select-tso"
                    placeholder={this.props.project.officer}
                    closeMenuOnSelect={true}
                    isMulti={false}
                    isClearable
                  />
                </div>
                <div className='edit-select'>
                  <p>Treasury Analyst: </p>
                  <Select
                    name="analyst"
                    options={analysts}
                    className="edit-select-tsa"
                    placeholder={this.props.project.analyst}
                    closeMenuOnSelect={true}
                    isMulti={false}
                    isClearable
                  />
                </div>
                <div className='edit-select'>
                  <p>Due Date:</p>
                  {/*<Calendar
                  onChange={this.inputDueDate}
                  value={this.state.dueDate}
                />*/}
                <div>
                </div>
                  {/*<input
                    placeholder={this.props.project.dueDate}
                    id='date'
                    type="date"
                    // defaultValue={!this.state.dueDate ? this.props.project.dueDate : this.state.dueDate}
                    onChange={this.inputDueDate}
                    className="edit-select-date"
                  />*/}
                  <TextField
                  id="date"
                  label="Due Date:"
                  type="date"
                  defaultValue={this.getCurrentDate()}
                  className="edit-select-date"
                  // InputLabelProps={{
                  //   shrink: true,
                  // }}
                />


              </div>

              </div>





              {/*<input className="input-startDate" placeholder={ currentDate() } />*/}
              {/*<input onChange={this.inputDueDate} className="input-dueDate" placeholder="Due Date" type="date"/>*/}
              <div className="edit-notes-container">
                <textarea value={this.state.notes === null ? this.props.project.notes : this.state.notes} onChange={this.inputNotes} className="edit-notes" />
                <div className="follow-up">

                  <div>
                    <h4 className="edit-follow-up-text">Follow up date?</h4>
                  </div>
                  <div className="follow-up-toggle-switch">
                    <label className="switch">
                      <input type="checkbox" onClick={this.followUp} />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <div className="follow-up-date">
                    <input
                      disabled={!this.state.followUp} name="departure"
                      type="date"
                      onChange={this.handleDueDateChange}
                      className="select-date"
                    />
                    {/*
                              this.state.followUp === true ?
                                <input

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
            <div className="edit-div-submit">
              <button className="edit-project-submit" form="edit-project-form" type='submit'>Save and Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// const StyledProjectModal = styled(ProjectModal)`
//   .project-label {
//     color: green
//   }
// `

const mapState = state => {
  return {
    user: state.user,
    teamMates: state.teamMates,
    companies: state.companies,
    project: state.project
  }
}

const mapDispatch = { submitCompletedProject, getUserProject, editUserProject }

const ProjectModalContainer = connect(mapState, mapDispatch)(ProjectModal)

export default ProjectModalContainer
