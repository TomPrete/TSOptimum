import axios from 'axios'
import history from '../history'

/***** ACTION TYPES*****/
// const GET_ALL_COMPANIES = 'GET_ALL_COMPANIES'
const CREATE_PROJECT = 'CREATE_PROJECT'
const GET_IN_PROCESS_USER_PROJECTS = 'GET_IN_PROCESS_USER_PROJECTS'
const GET_COMPLETED_USER_PROJECTS = 'GET_COMPLETED_USER_PROJECTS'
const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS'
const GET_ALL_USER_PROJECTS = 'GET_ALL_USER_PROJECTS'
const COMPLETED_PROJECT = 'COMPLETED_PROJECT';


/***** INITIAL STATE*****/
const defaultUser = {}

/***** ACTION CREATORS*****/
// const getAllCompanies = companies => ({ type: GET_ALL_COMPANIES, companies })
const createProject = project => (
  {
    type: CREATE_PROJECT,
    project
  }
)

const getInProcessUserProjects = projects => (
  {
    type: GET_IN_PROCESS_USER_PROJECTS,
    projects
  }
)

const getAllProjects = projects => (
  {
    type: GET_ALL_PROJECTS,
    projects
  }
)

const getCompletedUserProjects = projects => (
  {
    type: GET_COMPLETED_USER_PROJECTS,
    projects
  }
)

const getAllUserProjects = projects => (
  {
    type: GET_ALL_USER_PROJECTS,
    projects
  }
)

const updateCompletedProject = (project) => {
  return {
    type: COMPLETED_PROJECT,
    project
  }
}




/*****THUNK CREATORS*****/

// export const fetchAllCompanies = () =>
//   dispatch => {
//     axios.get(`/api/company`)
//       .then(res => res.data)
//       .then(companies => dispatch(getAllCompanies(companies)))
//       .catch(err => console.error(err));
// }



export const createNewProject = (name, projectType, officer, analyst, status, dueDate, notes, userId,teamId) =>
  dispatch => {
    axios.post(`/api/project`, { name, projectType, officer, analyst, status, dueDate, notes, userId, teamId })
      .then(res => res.data)
      .then(project => {
        dispatch(createProject(project));
        window.location.reload()
        // axios.get(`/api/project/${project.id}`)
      }
      )
      .catch(err => console.error(err))
  }

export const submitCompletedProject = (projectId) => dispatch => {
  axios.put(`/api/project/${projectId}`, {
    status: 'Complete'
  })
    .then(project => dispatch(updateCompletedProject(project)))
    .then(project => window.location.reload())
    .catch(err => console.error("error submitting completed project: ", error))
}

export const fetchInProcessUserProjects = (id) =>
  dispatch => {
    axios.get(`/api/project/in-process/${id}`)
      .then(res => res.data)
      .then(projects =>
        dispatch(getInProcessUserProjects(projects)))
      .catch(err => console.error(err))
  }

export const fetchCompletedUserProjects = id =>
  dispatch => {
    axios.get(`/api/project/complete/${id}`)
      .then(res => res.data)
      .then(projects =>
        dispatch(getCompletedUserProjects(projects)))
      .catch(error = console.error("error fetching completed user projects: ", error))
  }

export const fetchAllUserProjects = id =>
  dispatch => {
    axios.get(`/api/project/${id}`)
      .then(res => res.data)
      .then(projects =>
        dispatch(getAllUserProjects(projects)))
      .catch(error = console.error("error fetching all user projects: ", error))
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
      case GET_IN_PROCESS_USER_PROJECTS:
        return action.projects
      case GET_COMPLETED_USER_PROJECTS:
        return action.projects
      case GET_ALL_USER_PROJECTS:
        return action.projects
      case GET_ALL_PROJECTS:
        return action.projects
      case CREATE_PROJECT:
        return [...state, action.project]
      case COMPLETED_PROJECT:
        return [...state, action.project];
      // case UPDATE_PROJECT:
      default:
        return state
    }
  }
