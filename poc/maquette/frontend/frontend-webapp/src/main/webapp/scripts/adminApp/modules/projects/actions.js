import fetch from 'isomorphic-fetch'

/*********************************************************
***************** Fetch related actions ********************
*********************************************************/

// Backend api adress
export const PROJECTS_API='http://localhost:8080/api/projects'

// Action to inform store that te projects request is running
export const REQUEST_PROJECTS = 'REQUEST_PROJECTS'
export function requestProjects() {
  return {
    type: REQUEST_PROJECTS,
  }
}

// Action to inform store that te projects are availables
export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS'
export function receiveProjects(projects) {
  return {
    type: RECEIVE_PROJECTS,
    projects: projects,
    receivedAt: Date.now()
  }
}

// Action to inform store that the running projects request failed
export const FAILED_PROJECTS = 'FAILED_PROJECTS'
function failedProjects(error) {
  return {
    type : FAILED_PROJECTS,
    error : error
  }
}

// Function to check the projects request response status
function checkStatus(response) {
  if (response.status === 200 ) {
    return response
  } else {
    var error = new Error(response.statusText)
    throw error
  }
}

// Asynchrone action to fetch projects from backend
export function fetchProjects() {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  return function (dispatch, getState) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(requestProjects())

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    // Init the authorization bearer of the fetch request
    let authorization = "Basic"
    if ( getState().authentication && getState().authentication.user && getState().authentication.user.access_token){
      authorization = "Bearer " + getState().authentication.user.access_token
    }

    return fetch(PROJECTS_API, {
      headers: {
        'Accept': 'application/json',
        'Authorization': authorization
      }
    })
    .then(checkStatus)
    .then(function(response) {
      return response.json()
    }).then(function(body) {
      dispatch(receiveProjects(body))
    }).catch(function(error) {
      dispatch(failedProjects(error.message))
    })
  }
}

// Add a project to the list
export const ADD_PROJECT = 'ADD_PROJECT'
export function addProject({ id, name }) {
  return {
    type: ADD_PROJECT,
    id,
    name
  }
}

export const DELETE_PROJECT = 'DELETE_PROJECT'
export function deleteProject(id) {
  return {
    type: DELETE_PROJECT,
    id
  }
}