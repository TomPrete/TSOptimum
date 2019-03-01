import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AdminSideBar from './AdminSideBar'
import AddUserModal from './AddUserModal';
import AdminUserModal from './AdminUserModal'
// import AddPerson from '..../public/img/add-person.svg'
import store, { fetchAllUsers, fetchAllTeams } from '../store'
import users from '../store/users';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
// import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';
// import Signup from './SignUp'




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
      user: null,
      addUser: false
    }

    this.showAddUserModal = this.showAddUserModal.bind(this)
    this.showUserModal = this.showUserModal.bind(this)
    this.clickOutside = this.clickOutside.bind(this)
  }

  componentDidMount() {
    // console.log("Props: ", this.props.selectedUser)
    store.dispatch(fetchAllTeams())
    window.addEventListener('click', this.clickOutside)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.clickOutside)
  }

  showUserModal(user) {
    if (!this.state.user) {
      this.setState({
        user: [user]
      })

    } else {
      this.setState({
        user: null
      })
    }
  }

  showAddUserModal() {
    if (!this.state.addUser) {
      this.setState({
        addUser: true
      })
    } else {
      this.setState({
        addUser: false
      })
    }
  }


  clickOutside(e) {
    const modal = document.getElementById('modal-component')
    if (e.target === modal) {
      this.setState({
        user: null,
        addUser: false
      })
    }
  }


  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
    const users = this.props.users
    return (
      <div id="completed-projects-container">
        <div className='sidebar-container'>
          <AdminSideBar />
        </div>
        <div className="admin-users">

        <div className="add-user">
          <Button color='primary' variant='contained' className='material-primary-button' style={{ backgroundColor: 'rgb(0, 151, 131)' }} onClick={() => this.showAddUserModal()}>Add User</Button>
          {/*<Fab color="primary" aria-label="Add" className='' style={{ backgroundColor: 'rgb(0, 151, 131)' }} onClick={this.showAddUserModal}>
            <AddIcon />
    </Fab>*/}
        </div>

        <Paper >
          <Table>
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
                            <EditIcon key='edit' onClick={() => this.showUserModal(user)} className="edit-icon"></EditIcon>
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
        </div>


        {
          this.state.user
            ?
            <div id='modal-component'>
              <AdminUserModal selectedUser={this.state.user[0]} showUserModal={this.showUserModal} />
            </div>
            :
            null
        }
        {
          this.state.addUser
            ?
            <div id='modal-component'>
              <AddUserModal showAddUserModal={this.showAddUserModal} />
            </div>
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
    users: state.users
  }
}


const mapDispatch = { fetchAllUsers, fetchAllTeams }


const AdminUsersContainer = connect(mapState, mapDispatch)(AdminUsers)

export default AdminUsersContainer
