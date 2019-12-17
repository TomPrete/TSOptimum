import axios from 'axios'
import history from '../history'


/***** ACTION TYPES*****/
const GET_USER_PORTFOLIO = 'GET_USER_PORTFOLIO'
const ADD_TO_PORTFOLIO = 'ADD_TO_PORTFOLIO'
const REMOVE_FROM_PORTFOLIO = 'REMOVE_FROM_PORTFOLIO'


/***** INITIAL STATE*****/
const defaultPortfolio = []

/***** ACTION CREATORS*****/
const getUserPortfolio = portfolio => (
  {
    type: GET_USER_PORTFOLIO,
    portfolio
  }
)

const addToPortfolio = portfolio => (
  {
    type: ADD_TO_PORTFOLIO,
    portfolio
  }
)

/*****THUNK CREATORS*****/
export const fetchUserPortfolio = (userId, user) =>
  dispatch => {
    axios.post(`api/portfolio/${userId}`, { user })
      .then(res => res.data)
      .then(portfolio => {
        dispatch(getUserPortfolio(portfolio))
      })
      .catch(err => console.error(err));
  }

export const addToUserPortfolio = (company, user) =>
  dispatch => {
    axios.post(`api/portfolio/add`, { company, user })
      .then(res =>
        res.data)
      .then(data => {
        let { id, companyId, name } = data.data
        dispatch(addToPortfolio({ id, companyId, name }))
      })
      .catch(err => console.error(err));
  }

export const removeFromPortfolio = (id, userId) =>
  dispatch => {
    axios.delete(`api/portfolio/remove/${id}`,{
        userId: userId,
        id: id
      })
      .then(res => {
        if (res.data.msg === 'success') {
          return history.push('/my-portfolio')
        } else {
          return {res}
        }
      })
  }

/***** REDUCER *****/
export default function (state = defaultPortfolio, action) {
  switch (action.type) {
    case GET_USER_PORTFOLIO:
      return action.portfolio;
    case ADD_TO_PORTFOLIO:
      let company = action.portfolio;
      let portfolioLength = 0;
      while (portfolioLength < state.length) {
        if (state[portfolioLength].id !== company.id) {
          portfolioLength++
        } else {
          return state
        }
      }
      return [...state, action.portfolio];
    default:
      return state
  }
}
