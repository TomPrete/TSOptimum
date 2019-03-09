import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import Modal from '@material-ui/core/Modal'
import store, { updateUserAdminThunk, deleteUserThunk } from '../store'
import Select from 'react-select';
// import history from '../history'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button';



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
      redirect: false,
      deleteModalOpen: false,
      delete: false
    }
    this.followUp = this.followUp.bind(this)
    this.handleUserAdminUpdate = this.handleUserAdminUpdate.bind(this)
    this.deleteModal = this.deleteModal.bind(this)
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
    this.confirmDelete = this.confirmDelete.bind(this)
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

  deleteModal(e) {
    if (!this.state.deleteModalOpen) {
      this.setState({
        deleteModalOpen: true,
        delete: false
      })
    }
    else {
      this.setState({
        deleteModalOpen: false,
        delete: false
      })
    }

  }

  confirmDelete = e => {
    this.setState({
      delete: true
    })
  }

  handleUserAdminUpdate(e) {
    e.preventDefault()
    let teamId = +e.target.team_id.value || this.props.selectedUser.teamId
    let userTitle = e.target.user_title.value || this.props.selectedUser.title
    let isAdmin = e.target.is_admin.value || this.props.selectedUser.isAdmin
    let userId = this.props.selectedUser.id
    this.props.updateUserAdminThunk(userId, teamId, userTitle, isAdmin)
  }

  handleDeleteUser() {

    if (this.props.selectedUser.id != this.props.user.id) {
      return this.props.deleteUserThunk(this.props.selectedUser.id)
    } else {
      return "The limit (user) does not exist"
    }

  }

  render() {
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
                placeholder={this.props.selectedUser.teamId ? this.props.selectedUser.teamId : "Select Market..."}
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
          <button className="edit-project-submit" type="submit" onClick={(e) => this.deleteModal()}>DELETE USER</button>
        </div>
        {
          this.state.deleteModalOpen
            ?
            <Modal
              id='delete-modal'
              open={this.state.deleteModalOpen}
              onClose={this.deleteModal}
            >
              <div className='delete-modal'>
                <div >
                  <div className='alert-message'>
                    ALERT!
                   </div>
                  <div className="delete-user-message">
                    Are you sure you want to permenantly delete this user?
                  </div>

                </div>
                {
                  this.state.delete
                    ?
                    <div className='delete-user-buttons'>
                      <Button color='secondary' className='delete-button' onClick={() => this.handleDeleteUser()}>DELETE</Button>
                      <Button color='primary' className='primary-button' onClick={this.deleteModal}>Cancel</Button>
                    </div>
                    :
                    this.props.selectedUser.id != this.props.user.id
                    ?
                    <div className='delete-user-buttons'>
                      <Button color='primary' className='secondary-button' onClick={this.deleteModal}>No</Button>
                      <Button color='primary' variant='outlined' className='material-primary-button' onClick={this.confirmDelete}>Yes</Button>
                    </div>
                    :
                    <div className='delete-user-buttons'>
                      <Button disabled >UNABLE TO SELF TERMINATE!</Button>
                    </div>
                }
              </div>


            </Modal>
            :
            null

        }


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

const mapDispatch = { updateUserAdminThunk, deleteUserThunk }

const AdminUserModalContainer = connect(mapState, mapDispatch)(AdminUserModal)

export default AdminUserModalContainer
