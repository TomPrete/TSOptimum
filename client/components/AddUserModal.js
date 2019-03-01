import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { addNewUser }  from '../store'
import Select from 'react-select'



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


  submitNewUser(...args) {
    console.log('SUBMIT NEW USER')
  }


  render() {
    return (
      <div>
      <form onSubmit={this.submitNewUser} id='submit-new-user-form'>



        <input placeholder="First Name"></input>
        <input placeholder="Last Name"></input>
        <input placeholder="Email"></input>
        <Select
          name='user_title'
          options={title}
          closeMenuOnSelect={true}
          placeholder="Select Title"
          isMulti={false}
          isClearable
          isSearchable

        />
        <Select
          name='user_title'
          options={this.props.teams}
          closeMenuOnSelect={true}
          placeholder="Select Team"
          isMulti={false}
          isClearable
          isSearchable

        />

        </form>
    <button type="submit" form='submit-new-user-form'>Create New User</button>
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

const mapDispatch = {addNewUser}

const AddUserModalContainer = connect(mapState, mapDispatch)(AddUserModal)

export default AddUserModalContainer
