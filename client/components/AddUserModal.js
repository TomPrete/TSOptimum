import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { AddNewUserInAdmin }  from '../store'
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


  submitNewUser(e) {
    console.log('SUBMIT NEW USER')
    let firstName = e.target.first_name.value
    let lastName = e.target.last_name.value
    let email = e.target.email.value
    let title = e.target.user_title.value

    console.log(firstName, lastName, email, title)
    this.props.AddNewUserInAdmin(firstName,lastName,email,title)
  }


  render() {
    return (
      <div>
      <form onSubmit={this.submitNewUser} id='submit-new-user-form'>



        <input name="first_name" placeholder="First Name"></input>
        <input  name="last_name" placeholder="Last Name"></input>
        <input name='email' placeholder="Email"></input>
        <Select
          name='user_title'
          options={title}
          closeMenuOnSelect={true}
          placeholder="Select Title"
          isMulti={false}
          isClearable
          isSearchable

        />
        {/*<Select
          name='user_title'
          options={this.props.teams}
          closeMenuOnSelect={true}
          placeholder="Select Team"
          isMulti={false}
          isClearable
          isSearchable

        /> */}

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

const mapDispatch = {AddNewUserInAdmin}

const AddUserModalContainer = connect(mapState, mapDispatch)(AddUserModal)

export default AddUserModalContainer
