import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/lib/Async';
import Select from 'react-select';
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

import store, { submitCompletedProject, getUserProject, editUserProject, removeUserProject, createNewProject } from '../store'
import {project_type, project_status} from './config.js'


// <select onChange={this.inputProjectType} className="edit-select-type" >

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  background: rgb(0, 151, 131);
  padding: 10px 20px 10px 20px;
  font-size: 22px;
  color: white;
`
const SelectBody = styled.div`
  padding: 0 20px;
`

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
      redirect: false,
      followUpButton: true
    }
    this.followUp = this.followUp.bind(this);
    this.inputProjectName = this.inputProjectName.bind(this);
    // this.inputProjectType = this.inputProjectType.bind(this);
    this.inputTsoName = this.inputTsoName.bind(this);
    this.inputTsaName = this.inputTsaName.bind(this);
    // this.inputStatus = this.inputStatus.bind(this);
    this.inputNotes = this.inputNotes.bind(this);
    this.inputDueDate = this.inputDueDate.bind(this);
    // this.removeProject = this.removeProject.bind(this)
    this.handleProjectSubmit = this.handleProjectSubmit.bind(this);
    this.loadOptions = this.loadOptions.bind(this);
    this.filterCompanies = this.filterCompanies.bind(this);
    this.getTreasuryOfficers = this.getTreasuryOfficers.bind(this);
    this.getTreasuryAnalysts = this.getTreasuryAnalysts.bind(this);
    this.getCurrentDate = this.getCurrentDate.bind(this);
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
  };

  componentDidMount() {
    if (this.props.projectId) {
      store.dispatch(getUserProject(this.props.projectId));
    };
  };



  followUp() {
    if (this.state.followUp === false) {
      this.setState({
        followUp: true,
        followUpButton: false
      });
    } else {
      this.setState({
        followUp: false,
        followUpButton: true
      });
    }
  }

  componentWillUnmount() {
    if (this.props.projectId) {
      store.dispatch(removeUserProject());
    }
  }

  //**** FUNCTIONS THAT HANDLE CHANGES TO THE INPUT FORM ****/

  inputProjectName(e) {
    const companyName = e.replace(/\W/g, '');
    this.setState({ companyName });
  }

  inputTsoName(e) {
    this.setState({
      officer: e.target.value
    });
  }

  inputTsaName(e) {
    this.setState({
      analyst: e.target.value
    });
  }

  getTreasuryOfficers(teamMates) {
    let officers = [];
    for (let i = 0; i < teamMates.length; i++) {
      if (teamMates[i].title === "Treasury Solutions Officer") {
        let obj = {};
        obj.label = teamMates[i].name;
        obj.value = teamMates[i].name;
        officers.push(obj);
      }
    }
    return officers;
  }

  getTreasuryOfficers(teamMates) {
    let officers = [];
    for (let i = 0; i < teamMates.length; i++) {
      if (teamMates[i].title === "Treasury Solutions Officer") {
        let obj = {};
        obj.label = teamMates[i].name;
        obj.value = teamMates[i].name;
        officers.push(obj);
      }
    }
    return officers;
  }

  getTreasuryAnalysts(teamMates) {
    let analysts = [];
    for (let i = 0; i < teamMates.length; i++) {
      if (teamMates[i].title === "Treasury Solutions Analyst") {
        let obj = {};
        obj.label = teamMates[i].name;
        obj.value = teamMates[i].name;
        analysts.push(obj);
      }
    }
    return analysts;
  };

  getCurrentDate() {
    return new Date().toISOString().slice(0, 10);
  };

  inputNotes(e) {
    this.setState({
      notes: e.target.value
    });
  };

  inputDueDate(e) {
    this.setState({
      dueDate: e.target.value
    });
  };

  handleDueDateChange = (evt) => this.setState({ departure: evt.target.value });


  async handleProjectSubmit(e) {
    e.preventDefault()
    let projectId = this.props.project.projectId;
    let name = !e.target.companyName.value ? this.props.project.name : e.target.companyName.value;
    let projectType = e.target.projectType.value || this.props.project.projectType;
    let officer = e.target.officer.value || this.props.project.officer;
    let analyst = e.target.analyst.value || this.props.project.analyst;
    let status = e.target.projectStatus.value || this.props.project.status;
    let dueDate = e.target.due_date.value || this.props.project.dueDate;
    let followUpDate = e.target.follow_up_date.value || this.props.project.followUpDate;
    let notes = !this.state.notes ? this.props.project.notes : this.state.notes;
    if (this.props.type === "EDIT TASK") {
      await this.props.editUserProject(projectId, name, projectType, officer, analyst, status, dueDate, notes, this.props.user.id, this.props.user.teamId)
      await store.dispatch(removeUserProject());
      await this.props.showProjectModal();
    } else if (this.props.type === "CREATE NEW TASK") {
      await this.props.createNewProject(name, projectType,officer,analyst,status, dueDate, notes, this.props.user.id, this.props.user.teamId);
      await this.props.showProjectModal();
    }
    else alert("ERROR! Try again.")
  }

  render() {
    let officers = this.getTreasuryOfficers(this.props.teamMates)
    let analysts = this.getTreasuryAnalysts(this.props.teamMates)

    return (
      <div id="projects-modal-container">
        <Header >
          <label className='project-label'>{this.props.type.toUpperCase()}</label>
          <span className='closeBtn' onClick={() => { this.props.showProjectModal(); this.componentWillUnmount() }}>&times;</span>
        </Header>
        <div className='edit-project-form'>
          <div id="edit-form-container">
            <form onSubmit={this.handleProjectSubmit} className="edit-project-form" id="edit-project-form">
              <SelectBody>
                <div className='edit-select'>
                  <p>Company Name:</p>
                  <AsyncSelect
                    id='company-select'
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
                  <p>Task Type: </p>
                  <Select
                    id='task-select'
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
                  <p>Task Status: </p>
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
                  <TextField
                    name="due_date"
                    id="date"
                    label="Due Date:"
                    type="date"
                    // defaultValue={this.props.project.dueDate}
                    placeholder={this.props.project ? this.props.project.dueDate : null}
                    className="edit-select-date"
                  // InputLabelProps={{
                  //   shrink: true,
                  // }}
                  />

                </div>
                <div className='edit-select'>
                  <div id='follow-up-date'>
                    <p>Follow up date?</p>
                    <Switch
                      checked={this.state.followUp}
                      onChange={this.followUp}
                      // value="checkedB"
                      color="secondary"
                      className="follow-up-toggle-switch"
                    />
                  </div>
                  <TextField
                    name="follow_up_date"
                    id="follow_up_date"
                    label="Follow-up Date:"
                    type="date"
                    disabled={this.state.followUpButton}
                    defaultValue={this.getCurrentDate()}
                    className="edit-select-date"
                  />

                </div>
              </SelectBody>
              {/*<input className="input-startDate" placeholder={ currentDate() } />*/}
              {/*<input onChange={this.inputDueDate} className="input-dueDate" placeholder="Due Date" type="date"/>*/}
              <SelectBody >
                <textarea value={this.state.notes === null ? this.props.project.notes : this.state.notes} onChange={this.inputNotes} className="edit-notes" />
              </SelectBody>
            </form>
            <div className="edit-div-submit">
              <Button color='primary' variant='contained' className="edit-project-submit" form="edit-project-form" type="submit" disabled={false} >Save and Close</Button>
            </div>
          </div>
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
    project: state.project
  }
}

const mapDispatch = { submitCompletedProject, getUserProject, editUserProject, createNewProject }

const ProjectModalContainer = connect(mapState, mapDispatch)(ProjectModal)

export default ProjectModalContainer
