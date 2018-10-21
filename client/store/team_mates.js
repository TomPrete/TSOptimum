import axios from 'axios'
import history from '../history'

/***** ACTION TYPES*****/
const GET_USER_TEAM_MATES = 'GET_USER_TEAM_MATES'


/***** INITIAL STATE*****/
const defaultUser = {}

/***** ACTION CREATORS*****/
const getUserTeamMates = users => ({ type: GET_USER_TEAM_MATES, users })


/*****THUNK CREATORS*****/

export const fetchUserTeamMates = (teamId) =>
  dispatch => {
    axios.get(`/api/users/team/${teamId}`)
      .then(res => res.data)
      .then(users => dispatch(getUserTeamMates(users)))
      .catch(err => console.error(err));
  }

/***** REDUCER *****/
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER_TEAM_MATES:
      return action.users
    default:
      return state
  }
}
