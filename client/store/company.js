import axios from 'axios'
import history from '../history'

/***** ACTION TYPES*****/
const GET_COMPANY = 'GET_COMPANY'


/***** INITIAL STATE*****/
const defaultState = {}

/***** ACTION CREATORS*****/
const getCompany = company => ({ type: GET_COMPANY, company })


/*****THUNK CREATORS*****/

export const fetchCompany = (id) =>
  dispatch => {
    axios.get(`/api/company/${id}`)
      .then(res => res.data)
      .then(company => {
        dispatch(getCompany(company))
      })
      .catch(err => console.error(err));
  }

/***** REDUCER *****/
export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_COMPANY:
      return action.company
    default:
      return state
  }
}
