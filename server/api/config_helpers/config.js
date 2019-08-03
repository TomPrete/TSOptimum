

const tsa_project_types = [
  {'Client Call': 0},
  {'Client Inquire':0},
  {'Client Issue':0},
  {'Exception Pricing':0},
  {'Implementation Request':0},
  {'Pricing Proforma':0},
  {'Refund Request':0},
  {'RFP':0},
  {'TMR':0},
  {'Special Project':0}
]

const projectTypes = (projectsArr, project_types) => {
  for (let i=0; i < projectsArr.length; i++) {
    let val = projectsArr[i].projectType;
    if (project_types[val]) {
      project_types[val] += 1;
    } else {
      project_types[val] = 1;
    }
  }
  return project_types
}


module.exports = {tsa_project_types, projectTypes}
