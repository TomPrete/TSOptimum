import axios from 'axios'
import history from '../history'

/***** ACTION TYPES*****/
// const GET_ALL_COMPANIES = 'GET_ALL_COMPANIES'
const CREATE_PROJECT = 'CREATE_PROJECT'
const GET_ALL_USER_PROJECTS = 'GET_ALL_USER_PROJECTS'
const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS'


/***** INITIAL STATE*****/
const defaultUser = {}

/***** ACTION CREATORS*****/
// const getAllCompanies = companies => ({ type: GET_ALL_COMPANIES, companies })
const createProject = project => ({ type: CREATE_PROJECT, project })
const getUserProjects = projects => ({ type: GET_ALL_USER_PROJECTS, projects })
const getAllProjects = projects => ({ type: GET_ALL_PROJECTS, projects })



/*****THUNK CREATORS*****/

// export const fetchAllCompanies = () =>
//   dispatch => {
//     axios.get(`/api/company`)
//       .then(res => res.data)
//       .then(companies => dispatch(getAllCompanies(companies)))
//       .catch(err => console.error(err));
// }



export const createNewProject = (name, projectType, officer, analyst, status, dueDate, notes, fk_personId) =>
  dispatch => {
    axios.post(`/api/project`, { name, projectType, officer, analyst, status, dueDate, notes, fk_personId})
      .then(res => { console.log("DATA: ", res.data); return res.data })
      .then(project => {
        // dispatch(createProject(project));
        console.log("DOES THIS WORK?");
        // window.location.reload()
        // axios.get(`/api/project/${project.id}`)
      }
      )
      .catch(err => console.error(err))
  }

export const fetchUserProjects = (fk_personId) =>
  dispatch => {
    axios.get(`/api/project/user-projects`, {fk_personId})
      .then(res => res.data)
      .then(projects => {console.log("HELP!!: ", projects),
        dispatch(getUserProjects(projects))})
      .catch(err => console.error(err))
  }

export const fetchAllProjects = () =>
  dispatch => {
    axios.get(`/api/project/all`)
      .then(res => res.data)
      .then(projects =>
        dispatch(getAllProjects(projects)))
      .catch(err => console.error(err))
  }

/***** REDUCER *****/
export default function (state = defaultUser, action) {
  switch (action.type) {
    // case GET_ALL_COMPANIES:
    //   return action.companies
    case GET_ALL_USER_PROJECTS:
      return action.projects
    case GET_ALL_PROJECTS:
      return action.projects
    case CREATE_PROJECT:
      return [...state, action.project]
    default:
      return state
  }
}