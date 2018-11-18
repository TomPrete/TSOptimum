import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AdminSideBar from './AdminSideBar'
import store, { fetchAllUsers } from '../store'
import users from '../store/users';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const AdminUsers = (props) => {
  const users = props.users
  return (
    <div id="completed-projects-container">
      <div className='sidebar-container'>
        <AdminSideBar />
      </div>
      <Paper>
      <Table>
      <TableHead>
      <TableRow>
      <TableCell>ID</TableCell>
      <TableCell>Person ID</TableCell>
      <TableCell>Name</TableCell>
      <TableCell>Title</TableCell>
      <TableCell>Team ID</TableCell>
      <TableCell>Role</TableCell>
      <TableCell>Reset Password</TableCell>
      </TableRow>
      </TableHead>
      <TableBody>
      {
        users.length > 0
          ?
          users.map(user => {

            return (

              <TableRow key={user.personId}>
                <TableCell numeric>{user.id}</TableCell>
                <TableCell numeric>{user.personId}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.title}</TableCell>
                <TableCell numeric>{user.teamId ? user.teamId : "Not Assigned"}</TableCell>
                <TableCell>{user.isAdmin ? "Admin" : "User"}</TableCell>
                <TableCell>{user.resetPassword ? "Yes" : "No"}</TableCell>
              </TableRow>
            )
          })
          :
          null
      }
      </TableBody>



      </Table>
      </Paper>
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
