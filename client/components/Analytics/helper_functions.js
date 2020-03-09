import { projectType } from '../config'



export const getProjectTypeLabel = (projectTypes) => {
  let projects = [];
  for (let i=0; i < projectTypes.length; i++) {
    projects.push(projectTypes[i]['label'])
  }
  return projects;
}

export const filterInProcessProjects = (projects) => {
  let active = 0;
  projects.map(project => {
    if (projects.status = "In Process") {
      active++
    }
  })
  return active
}
