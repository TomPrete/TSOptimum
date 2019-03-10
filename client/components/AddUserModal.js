import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { AddNewUserInAdmin } from '../store'
import Select from 'react-select'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';




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


class AddUserModal extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    this.submitNewUser = this.submitNewUser.bind(this)
  }


  submitNewUser(e) {
    e.preventDefault()
    let firstName = e.target.first_name.value;
    let lastName = e.target.last_name.value;
    let email = e.target.email.value;
    let title = e.target.user_title.value;
    let teamId = +e.target.team_id.value;
    let resetPassword = true;
    if (teamId > 0 && title.length > 0) {
      this.props.AddNewUserInAdmin(firstName, lastName, email, title, teamId, resetPassword);
      return this.props.showAddUserModal();
    } else {
      console.log("Must complete entire form")
    }
  }


  render() {
    return (
      <div id="admin-modal-container">
        <div className="standard-textarea-parent">CREATE NEW USER:</div>
        <form onSubmit={this.submitNewUser} id='submit-new-user-form'>
          <div className="standard-textarea-parent">
            <TextField
              name="first_name"
              autoFocus
              className="standard-textarea"
              label="First Name"
              placeholder="Ruthie"
              required

            />
          </div>
          <div className="standard-textarea-parent">
            <TextField
              className="standard-textarea"
              name="last_name"
              label="Last Name"
              placeholder="Cohen"
              required
            // className={classes.textField}

            />
          </div>
          <div className="standard-textarea-parent">
            <TextField
              className="standard-textarea"
              name='email'
              label="Email"
              placeholder="ruthie.cohen@monks.com"
              required
            // multiline
            // className={classes.textField}
            />
          </div>
          <div className="standard-select-parent">
            <Select
              required
              name='user_title'
              options={title}
              closeMenuOnSelect={true}
              placeholder="Select Title"
              isMulti={false}
              isClearable
              isSearchable
            />
          </div>

          <div className="standard-select-parent">
            <Select
            required
            name='team_id'
            options={this.props.teams}
            closeMenuOnSelect={true}
            placeholder="Select Market"
            isMulti={false}
            isClearable
            isSearchable
          />
          </div>


        </form>
        <div className='create-new-user-parent'>
          <Button color='primary' variant='contained' className='create-new-user-button'
          style={{ backgroundColor: 'rgb(0, 151, 131)' }} type="submit" form='submit-new-user-form'>Create New User</Button>
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

const mapDispatch = { AddNewUserInAdmin }

const AddUserModalContainer = connect(mapState, mapDispatch)(AddUserModal)

export default AddUserModalContainer
