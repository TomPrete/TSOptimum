import { project_type } from '../config'



export const getProjectTypeLabel = (project_types) => {
  let projects = [];
  for (let i=0; i < project_types.length; i++) {
    projects.push(project_types[i]['label'])
  }
  return projects;
}
