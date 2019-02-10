import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import Modal from '@material-ui/core/Modal'
import store, { submitCompletedProject, getUserProject, editUserProject, removeUserProject } from '../store'




class AdminUserModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      followUp: false,
      redirect: false
    }
    this.followUp = this.followUp.bind(this)
    // this.handleProjectSubmit = this.handleProjectSubmit.bind(this)
  }

  componentDidMount() {
    console.log("Props: ", this.props.userId)
    // store.dispatch(getUserUser(this.props.userId))
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

  handleDueDateChange = (evt) => this.setState({ departure: evt.target.value })


  // async handleProjectSubmit(e) {
    // e.preventDefault()
    // let projectId = this.props.project.projectId
    // let name = !this.state.name ? this.props.project.name : this.state.name;
    // let projectType = !this.state.projectType ? this.props.project.projectType : this.state.projectType;
    // let officer = !this.state.officer ? this.props.project.officer : this.state.officer;
    // let analyst = !this.state.analyst ? this.props.project.analyst : this.state.analyst;
    // let status = !this.state.status ? this.props.project.status : this.state.status;
    // let dueDate = !this.state.dueDate ? this.props.project.dueDate : this.state.dueDate;
    // let notes = !this.state.notes ? this.props.project.notes : this.state.notes;

    // await this.props.editUserProject(projectId, name, projectType, officer, analyst, status, dueDate, notes, this.props.user.id, this.props.user.teamId)
    // await store.dispatch(removeUserProject())
    // await this.props.showProjectModal()
    // this.setState({
    //   redirect: true
    // })
  // }

  render() {
    return (
      <div id="admin-modal-container" >
        <div>
        Here
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
  }
}

const mapDispatch = null

const AdminUserModalContainer = connect(mapState, mapDispatch)(AdminUserModal)

export default AdminUserModalContainer
