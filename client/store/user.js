import axios from 'axios'
import history from '../history'
import { fetchInProcessUserProjects, fetchAllUserProjects } from './projects.js'
import { fetchUserTeamMates } from './team_mates.js'
import { fetchUserTeam } from './team.js'
import { fetchAllUsers } from './users.js'

/***** ACTION TYPES*****/
const GET_USER = 'GET_USER'

const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'
const DELETE_USER = 'DELETE_USER'


/***** INITIAL STATE*****/
const defaultUser = {}

/***** ACTION CREATORS*****/
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
const updateUser = user => ({ type: UPDATE_USER, user })
const deleteUser = user => ({ type: DELETE_USER, user })



/*****THUNK CREATORS*****/
export const me = () =>
  async dispatch =>
    axios.get('/auth/me')
      .then(res => {
        dispatch(getUser(res.data))
        if (res.data.teamId && res.data.id) {
          dispatch(fetchUserTeamMates(res.data.teamId))
          dispatch(fetchUserTeam(res.data.teamId))
        }
        if (res.data.isAdmin) {
          dispatch(fetchAllUsers())
        }
      })
      .catch(err => console.log(err))


export const addNewUser = (firstName, lastName, email, title, password) =>
  dispatch =>
    axios.post('/auth/signup', { firstName, lastName, email, title, password })
      .then(user => {
        console.log('USER: ', user)
        return user.data
      })
      .then(res => {
        console.log("RESPONSE: ", res)
        dispatch(getUser(res.data))
        if (res.data.teamId && res.data.id) {
          dispatch(fetchUserTeamMates(res.data.teamId))
          dispatch(fetchUserTeam(res.data.teamId))
        }
        if (res.data.isAdmin) {
          dispatch(fetchAllUsers())
        }
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const loginUser = (email, password) =>
  dispatch =>
    axios.post('/auth/login', { email, password })
      .then(user => {
        let { id, firstName, lastName, email, title, personId, teamId } = user.data
        let userData = { id, firstName, lastName, email, title, personId, teamId }
        return userData
      })
      .then(user => {
        const action = getUser(user)
        dispatch(getUser(action))
        history.push(`/my-board`)
        window.location.reload()
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({ error: authError }))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

export const updateUserThunk = (id, firstName, lastName, email) =>
  dispatch => {
    axios.put(`/api/users/update/${id}`, { firstName, lastName, email })
      .then(user => {
        dispatch(updateUser(user.data))
      })
      .catch(err => console.error(err))
  }

export const updateUserAdminThunk = (id, teamId, title, isAdmin) =>
  dispatch => {
    axios.put(`/api/users/admin/users/update/${id}`, { teamId, title, isAdmin })
      .then(user =>
        window.location.reload()
      )
      .catch(err => console.error(err))
  }

export const updateUserPasswordThunk = (id, email, oldPassword, newPassword) =>
  dispatch => {
    axios.put(`/api/users/update-password/${id}`, { email, oldPassword, newPassword })
      .then(user => {
        console.log(user.statusText)
        dispatch(getUser(user.data))
      })
      .catch(err => console.error(err))
  }

export const forgotUserPasswordThunk = email =>
  dispatch => {
    axios.post('/api/users/forgot-password', { email })
      .then(user => {
        dispatch(getUser(user.data))
      })
      .catch(err => console.error(err))
  }

export const resetPassowordThunk = (token, newPassword, confirmedPassword) =>
  dispatch => {
    axios.post(`/api/users/reset-password/${token}`, { newPassword, confirmedPassword })
      .then(user => {

        history.push(`/login`)

      })
      .catch(err => console.error(err))
  }

export const deleteUserThunk = id =>
  dispatch => {
    axios.put(`/api/users/admin/delete-user/${id}`, { id })
      .then(user => {
        console.log("User was successfully deleted!")
        window.location.reload()
      })
      .catch(err => console.error(err))
  }


/***** REDUCER *****/
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER:
      return action.user
    default:
      return state
  }
}
