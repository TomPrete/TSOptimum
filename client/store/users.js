import axios from 'axios'
import history from '../history'

/***** ACTION TYPES*****/
const GET_ALL_USERS = 'GET_ALL_USERS'
const ADD_USER = 'ADD_USER'



/***** INITIAL STATE*****/
const defaultUser = {}

/***** ACTION CREATORS*****/
const getAllUsers = users => ({ type: GET_ALL_USERS, users })
const addUser = user => ({ type: ADD_USER, user })



/*****THUNK CREATORS*****/

export const fetchAllUsers = () => dispatch => {
  axios.get('/api/users/all')
    .then(res => res.data)
    .then(users => dispatch(getAllUsers(users)))
    .catch(err => console.error(err));
}


export const AddNewUserInAdmin = (firstName, lastName, email, title, teamId, resetPassword) =>
  dispatch =>
    axios.post('/api/users/admin/add-new-user', { firstName, lastName, email, title, teamId,  resetPassword })
    .then(res => res.data)
    .then(user => {
        dispatch(addUser(user[0]))
      })
      .catch(err => console.log(err))



/***** REDUCER *****/
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    case ADD_USER:
      return[...state, action.user]
    default:
      return state
  }
}
