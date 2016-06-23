/**
 * Combine all reducers for this aa to a single root reducer.
 */
import { combineReducers } from 'redux';
import ProjectsReducers from 'portalApp/modules/projects/reducers/ProjectsReducers'

export default combineReducers({
  projects: ProjectsReducers
});