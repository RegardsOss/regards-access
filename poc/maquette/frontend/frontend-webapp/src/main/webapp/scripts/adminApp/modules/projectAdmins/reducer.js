import {
  UPDATE_PROJECT_ADMIN,
  UPDATE_OR_CREATE_PROJECT_ADMIN,
  DELETE_PROJECT_ADMIN } from './actions'

const projectAdmins = (state = [], action) => {
  switch (action.type) {
    case UPDATE_OR_CREATE_PROJECT_ADMIN:
      let newState = state.concat() // Make a shallow copy
      let selectedProjectAdmin = newState.find(pa => pa.id === action.id)
      let projectList = []
      if(selectedProjectAdmin) {
        newState = newState.filter(pa => pa.id !== action.id)
        projectList = selectedProjectAdmin.projects
      }
      newState = newState.concat({
        id:action.id,
        name: action.name,
        projects: arrayUnique(projectList.concat(action.projects))
      })
      return newState
    case DELETE_PROJECT_ADMIN:
      return state.filter(pa => pa.id !== action.id)
    default:
      return state
  }
}

const arrayUnique = (array) => {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}

export default projectAdmins
