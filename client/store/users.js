// import axios from 'axios'
// import history from '../history'

// /***** ACTION TYPES*****/
// const GET_USERS = 'GET_USERS'


// /***** INITIAL STATE*****/
// const defaultUser = {}

// /***** ACTION CREATORS*****/
// const getUsers = users => ({ type: GET_USERS, users })


// /*****THUNK CREATORS*****/

// export const fetchUsers = () => dispatch => {
//   axios.get('/api/users/all')
//     .then(res => res.data)
//     .then(users => dispatch(getUsers(users)))
//     .catch(err => console.error(err));
// }

// /***** REDUCER *****/
// export default function (state = defaultUser, action) {
//   switch (action.type) {
//     case GET_USERS:
//       return action.users
//     default:
//       return state
//   }
// }
