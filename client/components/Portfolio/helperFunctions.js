export const linkToCompany = (id) => {
  console.log("ID: ", id)
  let hREF = window.location.origin;
  let companyURL = `company/${id}`;
  let finalURL = hREF+companyURL
  return window.location.href=finalURL
}
