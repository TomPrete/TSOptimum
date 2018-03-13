import axios from 'axios'
import history from '../history'

/***** ACTION TYPES*****/
// const GET_ALL_COMPANIES = 'GET_ALL_COMPANIES'
const CREATE_PROJECT = 'CREATE_PROJECT'


/***** INITIAL STATE*****/
const defaultUser = {}

/***** ACTION CREATORS*****/
// const getAllCompanies = companies => ({ type: GET_ALL_COMPANIES, companies })
const createProject = project => ({type: CREATE_PROJECT, project})



/*****THUNK CREATORS*****/

// export const fetchAllCompanies = () =>
//   dispatch => {
//     axios.get(`/api/company`)
//       .then(res => res.data)
//       .then(companies => dispatch(getAllCompanies(companies)))
//       .catch(err => console.error(err));
  // }

export const createNewProject = (name, projectType, officer, analyst, status, dueDate, notes) =>
dispatch => {
  axios.post(`/api/project`, {name, projectType, officer, analyst, status, dueDate, notes})
  .then(res => res.data)
  .then(project => dispatch(createProject(project)))
  .catch(err => console.error(err))
}

/***** REDUCER *****/
export default function (state = defaultUser, action) {
  switch (action.type) {
    // case GET_ALL_COMPANIES:
    //   return action.companies
    case CREATE_PROJECT:
      return [...state, action.project]
    default:
      return state
  }
}
