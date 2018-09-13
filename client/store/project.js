import axios from 'axios'
import history from '../history'

/***** ACTION TYPES*****/
// const GET_ALL_COMPANIES = 'GET_ALL_COMPANIES'
const EDIT_PROJECT = 'EDIT_PROJECT'
const GET_PROJECT = 'GET_PROJECT'
const REMOVE_PROJECT = 'REMOVE_PROJECT'


/***** INITIAL STATE*****/
const defaultUser = {}

/***** ACTION CREATORS*****/
const editProject = project => (
  {
    type: EDIT_PROJECT,
    project
  }
)

const getProject = project => (
  {
    type: GET_PROJECT,
    project
  }
)

const removeProject = () => (
  {
    type: REMOVE_PROJECT,
    project: {}
  }
)



/*****THUNK CREATORS*****/


export const editUserProject = (projectId, name, projectType, officer, analyst, status, dueDate, notes, userId,teamId) => dispatch => {
  axios.put(`/api/project/${projectId}`, {
    name, projectType, officer, analyst, status, dueDate, notes, userId, teamId
  })
    .then(project => dispatch(editProject(project)))
    .then(project => window.location.reload())
    .catch(err => console.log("error editing project: ", error))
}

export const getUserProject = projectId => dispatch => {
  axios.get(`/api/project/${projectId}`)
    .then(res => res.data)
    .then(project => dispatch(getProject(project)))
    .catch(error => console.log("error getting project: ", error))
}

export const removeUserProject = () => dispatch => {
  dispatch(removeProject())
}


  /***** REDUCER *****/
  export default function (state = defaultUser, action) {
    switch (action.type) {
      case EDIT_PROJECT:
        return action.project
      case GET_PROJECT:
        return action.project
      case REMOVE_PROJECT:
        return action.project
      default:
        return state
    }
  }
