import * as React from 'react'
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { Authentication } from '../../../../../scripts/adminApp/modules/authentication/containers/AuthenticationContainer'
import LoginComponent, { LoginProps } from '../../../../../scripts/adminApp/modules/authentication/components/LoginComponent'

function setup() {
  const props = {
    errorMessage: 'Oops',
    theme: 'default',
    onLogin: (username: string, password: string): void => null
  }
  const enzymeWrapper = shallow(<Authentication {...props}/>)
  return {
    props,
    enzymeWrapper
  }
}

// Test a component rendering
describe('[ADMIN APP] Testing authentication container', () => {

  /**
   * Not tested
   * Behaviour is expected to be extracted from mapStateToProps
   * to be moved to selectors
   *
   * @see http://randycoulman.com/blog/2016/03/15/testing-redux-applications/
   */
  // it('should get state mapped to props', () => {
  // })

  /**
   * Not tested
   * Trivial and not worth testing
   *
   * @see http://randycoulman.com/blog/2016/03/15/testing-redux-applications/
   */
  // it('should get dispatch mapped to props', () => {
  //
  // });

  // it('should render self and subcomponents', () => {
  //   // TODO
  // })

});