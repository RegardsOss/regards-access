import { expect } from "chai"
import * as actions from "../actions" // You can use any testing library

describe('[ADMIN APP] Testing ui actions', () => {

  it('should create an action to select a project', () => {
    const expectedAction = {
      type: 'SELECT_PROJECT',
      id: 'toto'
    }
    expect(actions.selectProject('toto')).to.eql(expectedAction)
  })

  it('should create an action to select a project admin', () => {
    const expectedAction = {
      type: 'SELECT_PROJECT_ADMIN',
      id: 'toto'
    }
    expect(actions.selectProjectAdmin('toto')).to.eql(expectedAction)
  })

})
