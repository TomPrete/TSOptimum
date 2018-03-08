import axios from 'axios'
import history from '../history'

/***** ACTION TYPES*****/
const GET_USER_TEAM = 'GET_USER_TEAM'


/***** INITIAL STATE*****/
const defaultUser = {}

/***** ACTION CREATORS*****/
const getUserTeam = users => ({ type: GET_USER_TEAM, users })


/*****THUNK CREATORS*****/

export const fetchUserTeam = (teamId) =>
  dispatch => {
    axios.get(`/api/users/team/${teamId}`)
      .then(res => res.data)
      .then(users => dispatch(getUserTeam(users)))
      .catch(err => console.error(err));
  }

/***** REDUCER *****/
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER_TEAM:
      return action.users
    default:
      return state
  }
}
