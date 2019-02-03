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
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Modal from '@material-ui/core/Modal'


const rows = [
  { id: 'id', disablePadding: true, label: 'ID' },
  { id: 'personId', disablePadding: false, label: 'Persons ID' },
  { id: 'name', disablePadding: false, label: 'Name' },
  { id: 'title', disablePadding: false, label: 'Title' },
  { id: 'email', disablePadding: false, label: 'Email' },
  { id: 'teamId', disablePadding: false, label: 'Team ID' },
  { id: 'role', disablePadding: false, label: 'Role' },
  { id: 'resetPassword', disablePadding: false, label: 'Reset Password' },
  { id: 'edit', disablePadding: false, label: 'Edit' }
];


class AdminUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }


  openModal() {
    this.setState({
      open: true
    })
    console.log("STATE: ", this.state.open)
  }

  closeModal() {
    this.setState({
      open: false
    })
    console.log("STATE: ", this.state.open)
  }

  render() {


    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
    const users = this.props.users

    return (
      <div id="completed-projects-container">
        <div className='sidebar-container'>
          <AdminSideBar />
        </div>
        <Paper >
          <Table className='admin-users' >
            <TableHead>
              <TableRow>
                <TableCell id="row">ID</TableCell>
                <TableCell id="row">Person ID</TableCell>
                <TableCell id="row">Name</TableCell>
                <TableCell id="row">Title</TableCell>
                <TableCell id="row">Email</TableCell>
                <TableCell id="row">Team ID</TableCell>
                <TableCell id="row">Role</TableCell>
                <TableCell id="row">Reset Password</TableCell>
                <TableCell id="row">Edit</TableCell>
              </TableRow>
            </TableHead>
            <tbody >
              {
                users.length > 0
                  ?
                  users.map(user => {

                    return (

                      <TableRow key={user.personId} className="row-user">
                        <TableCell className="MuiTableCell-root-35">{user.id}</TableCell>
                        <TableCell className="MuiTableCell-root-35">{user.personId}</TableCell>
                        <TableCell className="MuiTableCell-root-35">{user.name}</TableCell>
                        <TableCell className="MuiTableCell-root-35">{user.title}</TableCell>
                        <TableCell className="MuiTableCell-root-35">{user.email}</TableCell>
                        <TableCell className="MuiTableCell-root-35">{user.teamId ? user.teamId : "Not Assigned"}</TableCell>
                        <TableCell className="MuiTableCell-root-35">{user.isAdmin ? "Admin" : "User"}</TableCell>
                        <TableCell className="MuiTableCell-root-35">{user.resetPassword ? "Yes" : "No"}</TableCell>
                        <TableCell className="MuiTableCell-root-35">
                          <div>
                            <button key='edit' onClick={() => this.openModal()}>Edit</button>
                          </div>

                        </TableCell>



                      </TableRow>
                    )
                  })
                  :
                  null
              }
            </tbody>
          </Table>

        </Paper>


        <Modal
          open={this.state.open}
          onClose={this.closeModal}
        >
        <div>
        HERE
        </div>



        </Modal>
      </div>
    )
  }
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
