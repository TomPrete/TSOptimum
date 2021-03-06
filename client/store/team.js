import axios from 'axios'
import history from '../history'

/***** ACTION TYPES*****/
const GET_USER_TEAM = 'GET_USER_TEAM'


/***** INITIAL STATE*****/
const defaultUser = null

/***** ACTION CREATORS*****/
const getUserTeam = team => ({ type: GET_USER_TEAM, team })


/*****THUNK CREATORS*****/

export const fetchUserTeam = (teamId) =>
  dispatch => {
    axios.get(`/api/team/${teamId}`)
      .then(res => res.data)
      .then(team => dispatch(getUserTeam(team)))
      .catch(err => console.error(err));
  }

/***** REDUCER *****/
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER_TEAM:
      return action.team
    default:
      return state
  }
}
