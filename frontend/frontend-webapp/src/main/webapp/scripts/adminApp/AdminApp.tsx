/** @module AdminApp */
import * as React from 'react'
import { connect } from 'react-redux'
import * as ReactDOM from 'react-dom'

import { logout } from '../common/authentication/AuthenticateActions'
import Authentication from './modules/authentication/containers/AuthenticationContainer'
import { AuthenticationType } from '../common/authentication/AuthenticationTypes'
import { isAuthenticated } from '../common/authentication/AuthenticateUtils'

import ErrorComponent from '../common/components/ApplicationErrorComponent'
import Layout from '../common/layout/containers/Layout'
import Home from './modules/home/Home'
import MenuComponent from './modules/menu/components/MenuComponent'
// Theme
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import ThemeHelper from '../common/theme/ThemeHelper'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SelectTheme from '../common/theme/containers/SelectTheme'

interface AminAppProps {
  router: any,
  route : any,
  params: any,
  theme: string,
  authentication: AuthenticationType,
  content: any,
  location: any,
  onLogout: ()=> void
}

/**
 * React component to manage Administration application.
 * This component display admin layout or login form if the user is not connected
 */
class AdminApp extends React.Component<AminAppProps, any> {
  constructor(){
    super()
    this.state = { instance: false }
  }

  render(){
    const { theme, authentication, content, location, params, onLogout } = this.props

    // Build theme
    const muiTheme = ThemeHelper.getByName(theme)

    // Authentication
    const authenticated = isAuthenticated(authentication)
    if (authenticated === false){
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <Authentication />
        </MuiThemeProvider>
      )
    } else {
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <AppBar key='0'
              title="Regards admin dashboard"
              iconElementRight={
                <div>
                  <IconMenu
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  >
                    <MenuItem primaryText="Refresh" />
                    <MenuItem primaryText="Send feedback" />
                    <MenuItem primaryText="Settings" />
                    <MenuItem primaryText="Help" />
                    <MenuItem primaryText="Sign out" />
                  </IconMenu>
                </div>
              }
              />
              <MenuComponent />
            <Layout>
              <div key='1' style={{backgroundColor:'#ff4081',height: '100%'}}>
                <RaisedButton label="Click!" />
                  <SelectTheme/>
              </div>

              <div key='2' style={{backgroundColor:'#FFCA28'}}>
                {content}
              </div>
            </Layout>
          </div>
        </MuiThemeProvider>
      )
    }
  }
}

// Add theme from store to the component props
const mapStateToProps = (state: any) => ({
  theme: state.common.theme,
  authentication: state.common.authentication
})
const mapDispatchToProps = (dispatch: any) => ({
  onLogout: () => {dispatch(logout())}
})
export default connect<{}, {}, AminAppProps>(mapStateToProps, mapDispatchToProps)(AdminApp)