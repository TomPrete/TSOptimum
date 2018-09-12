import axios from 'axios'
import history from '../history'

/***** ACTION TYPES*****/
// const GET_ALL_COMPANIES = 'GET_ALL_COMPANIES'
const EDIT_PROJECT = 'EDIT_PROJECT'


/***** INITIAL STATE*****/
const defaultUser = {}

/***** ACTION CREATORS*****/
const editProject = project => (
  {
    type: EDIT_PROJECT,
    project
  }
)




/*****THUNK CREATORS*****/


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
      .catch(err => console.log(err))
  }

export const submitCompletedProject = (projectId) => dispatch => {
  axios.put(`/api/project/${projectId}`, {
    status: 'Complete'
  })
    .then(project => dispatch(updateCompletedProject(project)))
    .then(project => window.location.reload())
    .catch(err => console.log("error submitting completed project: ", error))
}


  /***** REDUCER *****/
  export default function (state = defaultUser, action) {
    switch (action.type) {
      case GET_ALL_USER_PROJECTS:
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
