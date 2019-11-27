import axios from 'axios'
import history from '../history'
import moment from 'moment';

/***** ACTION TYPES*****/
// const GET_ALL_COMPANIES = 'GET_ALL_COMPANIES'
const CREATE_PROJECT = 'CREATE_PROJECT'
const GET_IN_PROCESS_USER_PROJECTS = 'GET_IN_PROCESS_USER_PROJECTS'
const GET_COMPLETED_USER_PROJECTS = 'GET_COMPLETED_USER_PROJECTS'
const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS'
const GET_ALL_USER_PROJECTS = 'GET_ALL_USER_PROJECTS'
const COMPLETED_PROJECT = 'COMPLETED_PROJECT';
const GET_USER_PROJECT_ANALYTICS = 'GET_USER_PROJECT_ANALYTICS';


/***** INITIAL STATE*****/
const defaultUser = []

/***** ACTION CREATORS*****/
// const getAllCompanies = companies => ({ type: GET_ALL_COMPANIES, companies })
const createProject = project => (
  {
    type: CREATE_PROJECT,
    project
  }
)

const getInProcessUserProjects = inProcessProjects => (
  {
    type: GET_IN_PROCESS_USER_PROJECTS,
    inProcessProjects
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

const getUserProjectAnalytics = (user_project_analytics) => {
  return {
    type: GET_USER_PROJECT_ANALYTICS,
    user_project_analytics
  }
}


/*****THUNK CREATORS*****/


export const createNewProject = (name, projectType, officer, analyst, status, dueDate, notes, userId, teamId) =>
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
    status: 'Complete',
    completedAt: Date.now()
  })
    .then(project => {
      dispatch(updateCompletedProject(project))
      window.location.reload()
    })
    .catch(err => console.log("error submitting completed project: ", error))
}

export const fetchInProcessUserProjects = id =>
  dispatch => {
    axios.get(`/api/project/in-process/${id}`)
      .then(res => res.data)
      .then(projects => {
        console.log("fetchInProcessUserProjects: ", projects)
        return dispatch(getInProcessUserProjects(projects))
      })
      .catch(error => console.log(error))
  }

export const fetchCompletedUserProjects = id =>
  dispatch => {
    axios.get(`/api/project/complete/${id}`)
      .then(res => res.data)
      .then(projects => {
        console.log("fetchCompletedUserProjects: ", projects)
        return dispatch(getCompletedUserProjects(projects))
      })
  }

export const fetchAllUserProjects = id =>
  dispatch => {
    axios.get(`/api/project/user_${id}`)
      .then(res => res.data)
      .then(projects => {
        console.log("fetchAllUserProjects:", projects)
        return dispatch(getAllUserProjects(projects))
      }
      )
  }

export const fetchAllProjectsAnalytics = (id, filter = 'all') =>
  dispatch => {
    axios.get(`/api/project/analytics/user_${id}/${filter}`)
      .then(res => res.data)
      .then(projects => {
        let activeTasks = filterInProcessProjects(projects);
        let completeTasks = filterCompletedTasks(projects);
        let numOfProjects = projectTypes(projects);
        return dispatch(getUserProjectAnalytics({ projects, numOfProjects, activeTasks, completeTasks }))
      }
      )
  }

export const fetchAllProjects = () =>
  dispatch => {
    axios.get(`/api/project/all`)
      .then(res => res.data)
      .then(projects =>
        dispatch(getAllProjects(projects)))
      .catch(error => console.log(error))
  }

/***** REDUCER *****/
export default function (state = defaultUser, action) {
  switch (action.type) {
    // case GET_ALL_COMPANIES:
    //   return action.companies
    case GET_IN_PROCESS_USER_PROJECTS:
      return action.inProcessProjects
    case GET_COMPLETED_USER_PROJECTS:
      return action.projects
    case GET_ALL_USER_PROJECTS:
      return action.projects
    case GET_ALL_PROJECTS:
      return action.projects
    case CREATE_PROJECT:
      return [...state, action.project]
    case COMPLETED_PROJECT:
      return [...state];
    // case UPDATE_PROJECT:
    case GET_USER_PROJECT_ANALYTICS:
      return [action.user_project_analytics]
    default:
      return state
  }
}



// HELPER FUNCTIONS


const projectsStatus = (projectsArr) => {
  let inProcess = 0;
  let complete = 0;
  for (let i = 0; i < projectsArr.length; i++) {
    if (projectsArr[i].status === "Complete") {
      complete += 1;
    } else if (projectsArr[i].status === "In Process") {
      inProcess += 1;
    }
  }
  return [inProcess, complete]
}

const projectTypes = (projectsArr) => {
  let numOfProjectTypes = {};
  for (let i = 0; i < projectsArr.length; i++) {
    let val = projectsArr[i].projectType;
    if (numOfProjectTypes[val]) {
      numOfProjectTypes[val] += 1;
    } else {
      numOfProjectTypes[val] = 1;
    }
  }
  return numOfProjectTypes
}

const filterCompletedTasks = (projects) => {
  let completedThisWeek = 0
  let thisWeek = moment().week()
  projects.map(project => {
    if (project.status === "Complete" && moment(project.completedAt).week() == thisWeek) {
      completedThisWeek++
    }
  })
  return completedThisWeek
}

const filterInProcessProjects = (projects) => {
  let active = 0;
  let completedThisWeek = 0
  let thisWeek = moment().week()
  projects.map(project => {
    console.log("project -> ")
    if (project.status === "In Process") {
      active++
    }
    if (project.status === "Complete" && moment(project.updatedAt).week() == thisWeek) {
      completedThisWeek++
    }
  })
  return active
}

const project_type = [
  {
    label: 'Client Call',
    value: 'Client Call'
  },
  {
    label: 'Client Inquire',
    value: 'Client Inquire'
  },
  {
    label: 'Client Issue',
    value: 'Client Issue'
  },
  {
    label: 'Exception Pricing',
    value: 'Exception Pricing'
  },
  {
    label: 'Implementation Request',
    value: 'Implementation Request'
  },
  {
    label: 'Pricing Proforma',
    value: 'Pricing Proforma'
  },
  {
    label: 'Refund Request',
    value: 'Refund Request'
  },
  {
    label: 'RFP',
    value: 'RFP'
  },
  {
    label: 'TMR',
    value: 'TMR'
  },
  {
    label: 'Special Project',
    value: 'Special Project'
  }
]
