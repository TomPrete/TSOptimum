import axios from 'axios'
import history from '../history'

/***** ACTION TYPES*****/
const GET_ALL_COMPANIES = 'GET_ALL_COMPANIES'


/***** INITIAL STATE*****/
const defaultUser = {}

/***** ACTION CREATORS*****/
const getAllCompanies = companies => ({ type: GET_ALL_COMPANIES, companies })


/*****THUNK CREATORS*****/

export const fetchAllCompanies = () =>
  dispatch => {
    axios.get(`/api/company`)
      .then(res => res.data)
      .then(companies => dispatch(getAllCompanies(companies)))
      .catch(err => console.error(err));
  }

/***** REDUCER *****/
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_ALL_COMPANIES:
      return action.companies
    default:
      return state
  }
}
