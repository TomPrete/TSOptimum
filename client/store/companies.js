import axios from 'axios'
import history from '../history'

/***** ACTION TYPES*****/
const GET_ALL_COMPANIES = 'GET_ALL_COMPANIES'

/***** INITIAL STATE*****/
const defaultState = {}

/***** ACTION CREATORS*****/
const getAllCompanies = companies => ({ type: GET_ALL_COMPANIES, companies })

/*****THUNK CREATORS*****/

export const fetchAllCompanies = () =>
  dispatch => {
    axios.get(`/api/company`)
      .then(res => res.data)
      .then(companies => {let sortedCompanies = companies.sort(function (a, b) {
        var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
        if (nameA < nameB)
          return -1
        if (nameA > nameB)
          return 1
        return 0;
      }); return sortedCompanies})
      .then(sortedCompanies => {
        const companies = []
        for (let i = 0; i < sortedCompanies.length; i++) {
          companies.push({
            value: sortedCompanies[i].name,
            label: sortedCompanies[i].name
          })
        }
        dispatch(getAllCompanies(companies))})
      .catch(err => console.error(err));
  }

/***** REDUCER *****/
export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_ALL_COMPANIES:
      return action.companies
    default:
      return state
  }
}
