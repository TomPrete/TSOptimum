import axios from 'axios'
import history from '../history'

/***** ACTION TYPES*****/
const GET_USER = 'GET_USER'
const ADD_USER = 'ADD_USER'
const REMOVE_USER = 'REMOVE_USER'

/***** INITIAL STATE*****/
const defaultUser = {}

/***** ACTION CREATORS*****/
const getUser = user => ({ type: GET_USER, user })
const addUser = user => ({ type: ADD_USER, user })
const removeUser = () => ({ type: REMOVE_USER })

/*****THUNK CREATORS*****/
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const addNewUser = (firstName, lastName, email, title, password) =>
  dispatch =>
    axios.post('/auth/signup', { firstName, lastName, email, title, password })
      .then(user => {
        window.location.reload()
        return user.data})
      .then(user => {
        const action = getUser(user)
        dispatch(getUser(action))
        history.push(`/user/${user.personId}`)
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({ error: authError }))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const loginUser = (email, password) =>
  dispatch =>
    axios.post('/auth/login', {email, password })
      .then(user => {
        window.location.reload()
        return user.data})
      .then(user => {
        const action = getUser(user)
        dispatch(getUser(action))
        history.push(`/user/${user.personId}`)

      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({ error: authError }))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

/***** REDUCER *****/
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case ADD_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
