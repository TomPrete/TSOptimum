import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { submitCompletedProject } from '../store'



class ProjectModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {

  }


  render() {
    // const {projectsId} = this.props
    console.log("PROPS: ", this.props.projectId)

    return (
      <div id="projects-modal-container">
        <h1>Project Modal: {this.props.projectId}</h1>
        <div className='show-project-form' >
          <div className='project-form'>
            <div id="label-project">
              <label>EDIT PROJECT</label>
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
                  placeholder="Due Date:"
                  id='date'
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
              <div className="div-submit">
                <button className="project-submit" form="project-form" type='submit'>Create New Project</button>
              </div>
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
    projects: state.projects
  }
}

const mapDispatch = { submitCompletedProject }

const ProjectModalContainer = connect(mapState, mapDispatch)(ProjectModal)

export default ProjectModalContainer
