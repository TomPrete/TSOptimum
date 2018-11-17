import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AdminSideBar from './AdminSideBar'
import store, { fetchAllUsers } from '../store'
import users from '../store/users';


const AdminUsers = (props) => {


  // async componentDidMount() {
  //   store.dispatch(fetchAllUsers())
  // }
    const users = props.users
    return (
      <div id="completed-projects-container">
        {
          users.length > 0
            ?
            users.map(user => {
              console.log("USER: ", user.name)
              return (
                <div key={user.personId} >
                <p>
                {user.name}
                </p>

                </div>
              )
            })
            :
            <div>
              here
        </div>
        }

      </div>
    )
  }


const mapState = state => {
  return {
    user: state.user,
    users: state.users
  }
}


const mapDispatch = { fetchAllUsers }


const AdminUsersContainer = connect(mapState, mapDispatch)(AdminUsers)

export default AdminUsersContainer
