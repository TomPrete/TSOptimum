import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { submitCompletedProject, getUserProject, editUserProject, removeUserProject } from '../store'




class ProjectModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      projectType: "",
      officer: "",
      analyst: "",
      dueDate: "",
      status: "In Process",
      notes: this.props.project.notes,
      dueDate: false,
      followUp: false
    }
    this.followUp = this.followUp.bind(this)

    this.inputProjectName = this.inputProjectName.bind(this);
    this.inputProjectType = this.inputProjectType.bind(this);
    this.inputTsoName = this.inputTsoName.bind(this);
    this.inputTsaName = this.inputTsaName.bind(this);
    this.inputStatus = this.inputStatus.bind(this);
    this.inputNotes = this.inputNotes.bind(this);
    this.inputDueDate = this.inputDueDate.bind(this)
    // this.handleProjectSubmit = this.handleProjectSubmit.bind(this)
    this.removeProject = this.removeProject.bind(this)
  }

  componentDidMount() {
    store.dispatch(getUserProject(this.props.projectId))
    // await this.setState({
    //   notes: this.props.project.notes
    // })
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

  removeProject() {
    store.dispatch(removeUserProject())
  }
//**** FUNCTIONS THAT HANDLE CHANGES TO THE INPUT FORM ****/

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



  render() {

    return (
      <div id="projects-modal-container">
        <div className='project-modal-header'>
          <label className='project-label'>EDIT PROJECT</label>
          <span className='closeBtn' onClick={() => {this.props.showModal(); this.removeProject()}}>&times;</span>
        </div>

        <div className='edit-project-form'>
          <div id="edit-form-container">
            <form onSubmit={this.handleProjectSubmit} className="edit-project-form" id="edit-project-form">
              <div>
                <input value={this.state.name} onChange={this.inputProjectName} type="text" name="search" list="companyList" className="edit-select-company" placeholder={this.props.project.name} required />
                <datalist id="companyList">
                  {
                    this.props.companies.map(company =>
                      <option key={company.id} value={company.name} required>{company.name}</option>)
                  }
                </datalist>
                <select onChange={this.inputProjectType} className="edit-select-type" required >
                  <option value={this.props.project.projectType
                  }>{this.props.project.projectType
                    }</option>
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
                <select onChange={this.inputStatus} defaultValue="In Process" className="edit-select-status" required >
                  <option value="In Process">In Process</option>
                  <option value="Complete">Complete</option>
                </select>
              </div>
              <div>
                <select onChange={this.inputTsoName} className="edit-select-tso" >
                  <option value={this.props.project.officer}>{this.props.project.officer}</option>
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
                <select onChange={this.inputTsaName} className="edit-select-tsa" >
                  <option value={this.props.project.analyst}>{this.props.project.analyst}</option>
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
                <input
                  required
                  placeholder={this.props.project.dueDate}
                  id='date'
                  name="departure"
                  type="date"
                  defaultValue={this.props.project.dueDate}
                  onChange={this.inputDueDate}
                  className="edit-select-date"
                />


              </div>


              {/*<input className="input-startDate" placeholder={ currentDate() } />*/}
              {/*<input onChange={this.inputDueDate} className="input-dueDate" placeholder="Due Date" type="date"/>*/}
              <div className="edit-notes-container">
                <textarea value={!this.state.notes ? this.props.project.notes : this.state.notes} onChange={this.inputNotes} className="edit-notes"/>
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
            <div className="edit-div-submit">
              <button className="edit-project-submit" form="edit-project-form" type='submit'>Save and Close</button>
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
    team: state.team,
    companies: state.companies,
    project: state.project
  }
}

const mapDispatch = { submitCompletedProject, getUserProject, editUserProject }

const ProjectModalContainer = connect(mapState, mapDispatch)(ProjectModal)

export default ProjectModalContainer
