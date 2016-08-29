const {CALL_API} = require('redux-api-middleware')
import { fetchEndpoints } from '../endpoints/actions'

export const AUTHENTICATE_API = 'http://localhost:8080/oauth/token'
export const REQUEST_AUTHENTICATE = 'REQUEST_AUTHENTICATE'
export const RECEIVE_AUTHENTICATE = 'RECEIVE_AUTHENTICATE'
export const FAILED_AUTHENTICATE = 'FAILED_AUTHENTICATE'

export const fetchAuthenticate = (username: String, password: String) => ({
  [CALL_API]: {
    types: [
      REQUEST_AUTHENTICATE,
      {
        type: RECEIVE_AUTHENTICATE,
        meta: { authenticateDate: Date.now(), name: username }
      },
      {
        type: FAILED_AUTHENTICATE,
        meta: (action: any, state: any, res: any) => {
          if (res.status === '500') {
            return { errorMessage: 'authentication.error.500' }
          } else {
            return { errorMessage: 'authentication.error' }
          }
        }
      }

    ],
    endpoint: AUTHENTICATE_API + "?grant_type=password&username=" + username + "&password=" + password,
    method: 'POST'
  }
})

export const LOGOUT = 'LOGOUT'
export function logout(): Object {
  return {
    type: LOGOUT
  }
}

/**
 * This is an unused example of how to chain/call multiple
 * actions with a single agregating action creator
 */
export const BOOTSTRAP_APP = 'BOOTSTRAP_APP'
export const bootstrapApp = () => {
  return (dispatch: any, getState: any) => {
    return dispatch(fetchAuthenticate('admin', 'admin'))
      .then(() => dispatch(fetchEndpoints()))
  }
}