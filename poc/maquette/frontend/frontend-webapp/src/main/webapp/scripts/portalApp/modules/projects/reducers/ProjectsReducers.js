import {
  REQUEST_PROJECTS,  RECEIVE_PROJECTS,
  FAILED_PROJECTS } from '../actions/ProjectsActions'

export default (state = {
  isFetching : false,
  items: [],
  lastUpdate: ''
}, action) => {
  switch(action.type){
    case REQUEST_PROJECTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_PROJECTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.payload,
        lastUpdate: action.meta.receivedAt
      })
    case FAILED_PROJECTS:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}
