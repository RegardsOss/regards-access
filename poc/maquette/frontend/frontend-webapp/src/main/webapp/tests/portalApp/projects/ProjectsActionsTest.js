import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import { expect } from 'chai' // You can use any testing library
import {
    PROJECTS_API, REQUEST_PROJECTS,  RECEIVE_PROJECTS,
    FAILED_PROJECTS, fetchProjects,
    requestProjects, receiveProjects } from '../../../scripts/portalApp/modules/projects/actions/ProjectsActions';
import { apiMiddleware } from 'redux-api-middleware'

const middlewares = [ thunk, apiMiddleware ]
const mockStore = configureMockStore(middlewares)

// Ce fichier permet de tester les actions liés aux projets
describe('Testing projects actions.', () => {

  afterEach(() => {
    nock.cleanAll()
  })

  // Test dégradé dans le cas ou le serveur renvoie un erreur
  it('creates FAILED_PROJECTS action when fetching projects returning error', () => {
    nock(PROJECTS_API)
      .get('')
      .reply(500, null);

    const expectedActionTypes = [ REQUEST_PROJECTS, FAILED_PROJECTS ]
    const store = mockStore({ projects: [] });

    return store.dispatch(fetchProjects())
      .then(() => { // return of async actions
        // There must be two dispatched actions from fetchProjects.
        expect(store.getActions().length).to.equal(2);
        // Check each dispatch action
        expect(store.getActions()[0].type).to.equal(expectedActionTypes[0])
        expect(store.getActions()[1].type).to.equal(expectedActionTypes[1])
      })
  })

  // Test nominal
  it('creates REQUEST_PROJECTS and RECEIVE_PROJECTS actions when fetching projects has been done', () => {
    nock(PROJECTS_API)
      .get('')
      .reply(200, [{"name":"cdpp"},{"name":"ssalto"}]);

    // We only check on action types, not the full action content for simplicity
    const expectedActionTypes = [ REQUEST_PROJECTS, RECEIVE_PROJECTS ]
    const store = mockStore({ projects: [] });

    return store.dispatch(fetchProjects())
      .then(() => { // return of async actions
        // There must be two dispatched actions from fetchProjects.
        expect(store.getActions().length).to.equal(2);
        // Check receivedAt time
        expect(store.getActions()[1].meta.receivedAt).to.be.at.most(Date.now());
        // Check each dispatch action
        expect(store.getActions()[0].type).to.equal(expectedActionTypes[0])
        expect(store.getActions()[1].type).to.equal(expectedActionTypes[1])
      })
  })
})
