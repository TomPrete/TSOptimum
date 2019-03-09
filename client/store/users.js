import axios from 'axios'
import history from '../history'

/***** ACTION TYPES*****/
const GET_ALL_USERS = 'GET_ALL_USERS'


/***** INITIAL STATE*****/
const defaultUser = {}

/***** ACTION CREATORS*****/
const getAllUsers = users => ({ type: GET_ALL_USERS, users })



/*****THUNK CREATORS*****/

export const fetchAllUsers = () => dispatch => {
  axios.get('/api/users/all')
    .then(res => res.data)
    .then(users => dispatch(getAllUsers(users)))
    .catch(err => console.error(err));
}



/***** REDUCER *****/
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    default:
      return state
  }
}
