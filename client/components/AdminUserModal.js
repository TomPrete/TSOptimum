import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import Modal from '@material-ui/core/Modal'
import store, { updateUserAdminThunk } from '../store'
import Select from 'react-select';
// import history from '../history'



const title = [
  {
    label: 'Treasury Solutions Analyst',
    value: 'Treasury Solutions Analyst'
  },
  {
    label: 'Treasury Solutions Officer',
    value: 'Treasury Solutions Officer'
  },
  {
    label: 'Relationship Manager',
    value: 'Relationship Manager'
  }
]

const boolean = [
  {
    label: 'True',
    value: 'True'
  },
  {
    label: 'False',
    value: 'False'
  }
]

class AdminUserModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      followUp: false,
      redirect: false
    }
    this.followUp = this.followUp.bind(this)
    this.handleUserAdminUpdate = this.handleUserAdminUpdate.bind(this)
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

  handleUserAdminUpdate(e) {
    e.preventDefault()
    let teamId = +e.target.team_id.value || this.props.selectedUser.teamId
    let userTitle = e.target.user_title.value || this.props.selectedUser.title
    let isAdmin = e.target.is_admin.value || this.props.selectedUser.isAdmin
    let userId = this.props.selectedUser.id
    this.props.updateUserAdmin
    this.props.updateUserAdminThunk(userId, teamId, userTitle, isAdmin)
  }


  render() {
    console.log("selected-user: ", this.props.selectedUser)
    return (

      <div id="admin-modal-container" >
        <div>
        <form onSubmit={this.handleUserAdminUpdate} id="update-user">
          <div>
            Persons ID: {this.props.selectedUser.personId}
          </div>
          <div>
            Name: {this.props.selectedUser.name}
          </div>
          <div>
            ID: {this.props.selectedUser.id}
          </div>
          <div>
            Team ID:


            <Select
              name="team_id"
              options={this.props.teams}
              closeMenuOnSelect={true}
              isMulti={false}
              placeholder={this.props.selectedUser.teamId}
              isClearable
              isSearchable

            />
          </div>
          <div>
            <div>
            Title:
            </div>

            <Select
              name="user_title"
              options={title}
              closeMenuOnSelect={true}
              placeholder={this.props.selectedUser.title}
              isMulti={false}
              isClearable
              isSearchable

            />
          </div>
          <div>
            Email: {this.props.selectedUser.email}
          </div>
          <div>
            Is Admin User:
            <Select
            name="is_admin"
            options={boolean}
            placeholder={this.props.selectedUser.isAdmin == true ? "True" : "False"}
            closeMenuOnSelect={true}
            isMulti={false}
            isClearable
            // isSearchable
            />
          </div>
          </form>
        </div>

        <div className="edit-div-submit">
          <button className="edit-project-submit" type="submit" form="update-user">Update and Close</button>
          {/* <button className="edit-project-submit" type="submit" >DELETE USER</button> */}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    teams: state.teams
  }
}

const mapDispatch = {updateUserAdminThunk}

const AdminUserModalContainer = connect(mapState, mapDispatch)(AdminUserModal)

export default AdminUserModalContainer
