import { CALL_API, getJSON } from 'redux-api-middleware'
import Schemas from 'common/api/schemas'
import { normalize } from 'normalizr'

const PROJECTS_API='http://localhost:8080/api/projects'
export const PROJECTS_REQUEST = 'PROJECTS_REQUEST'
export const PROJECTS_SUCESS  = 'PROJECTS_SUCESS'
export const PROJECTS_FAILURE = 'PROJECTS_FAILURE'

// Fetches all projects
// Relies on the custom API middleware defined in redux-api-middleware
// Normalize the json response
export const fetchProjects = () => ({
  [CALL_API]: {
    types: [
      PROJECTS_REQUEST,
      {
        type: PROJECTS_SUCESS,
        payload: (action, state, res) => getJSON(res).then((json) => normalize(json, Schemas.PROJECT_ARRAY))
      },
      PROJECTS_FAILURE
    ],
    endpoint: PROJECTS_API,
    method: 'GET'
  }
})

// Add a project to the list
export const ADD_PROJECT = 'ADD_PROJECT'
export function addProject(id, name) {
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
