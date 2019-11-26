import axios from 'axios'
import history from '../history'


/***** ACTION TYPES*****/
const GET_USER_PORTFOLIO = 'GET_USER_PORTFOLIO'
const ADD_TO_PORTFOLIO = 'ADD_TO_PORTFOLIO'


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
export const fetchUserPortfolio = (userId) =>
  dispatch => {
    axios.get(`api/portfolio/${userId}`)
      .then(res => res.data)
      .then(portfolio => {
        console.log("PORTFOLIO: ", portfolio)
        dispatch(getUserPortfolio(portfolio))
      })
      .catch(err => console.error(err));
  }

export const addToUserPortfolio = (companies, user) =>
  dispatch => {
    console.log("COMPANIES: ", companies)
    axios.post(`api/portfolio/add`, {companies, user})
      .then(res => res.data)
      .then(data => {
        console.log("PORTFOLIO: ", data)
        dispatch(addToPortfolio(data))
      })
      .catch(err => console.error(err));
  }

/***** REDUCER *****/
export default function (state = defaultPortfolio, action) {
  switch (action.type) {
    case GET_USER_PORTFOLIO:
      return action.portfolio;
    case ADD_TO_PORTFOLIO:
      return action.portfolio;
    default:
      return state
  }
}
