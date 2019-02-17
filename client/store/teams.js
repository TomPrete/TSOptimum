import axios from 'axios'
import history from '../history'


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


/***** ACTION TYPES*****/
const GET_ALL_TEAMS = 'GET_ALL_TEAMS'


/***** INITIAL STATE*****/
const defaultTeam = {}

/***** ACTION CREATORS*****/
const getAllTeams = teams => ({ type: GET_ALL_TEAMS, teams })


/*****THUNK CREATORS*****/

export const fetchAllTeams = () =>
  dispatch => {
    axios.get(`/api/team`)
      .then(res => res.data)
      .then(teams => {
        let teamsArr = []
        let sortedTeams = teams.sort(function (a, b) {
        var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
        if (nameA < nameB)
          return -1
        if (nameA > nameB)
          return 1
        return 0;
      });


      for (let i = 0; i < sortedTeams.length; i++) {
        let option = {}
        option.label = capitalizeFirstLetter(sortedTeams[i].name)
        option.value = sortedTeams[i].id
        teamsArr.push(option)
      }
      return teamsArr})
      .then(teamsArr => dispatch(getAllTeams(teamsArr)))
      .catch(err => console.error(err));
  }

/***** REDUCER *****/
export default function (state = defaultTeam, action) {
  switch (action.type) {
    case GET_ALL_TEAMS:
      return action.teams
    default:
      return state
  }
}
