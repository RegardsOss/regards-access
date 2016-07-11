import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import ReactDOM from 'react-dom'

import ApplicationErrorComponent from 'common/components/ApplicationErrorComponent'
import SelectThemeComponent from 'common/theme/components/SelectThemeComponent'
import InstanceComponent from './modules/projects/components/InstanceComponent'
import ProjectsContainer from './modules/projects/containers/ProjectsContainer'
import { getThemeStyles } from 'common/theme/ThemeUtils'
import { setTheme } from 'common/theme/actions/ThemeActions'

import { fetchAuthenticate } from 'common/authentication/AuthenticateActions'

class PortalApp extends React.Component {

  componentWillMount(){
    // Init application theme
    // initTheme and publicAuthenticate methods are set to the container props by react-redux connect.
    // See method mapDispatchToProps of this container
    this.props.initTheme("")
    this.props.publicAuthenticate()
  }

  render(){
    // authentication and theme are set in this container props by react-redux coonect.
    // See method mapStateToProps
    const { authentication, theme } = this.props
    // Get theme styles
    const styles = getThemeStyles(theme,'portalApp/styles')
    const commonStyles = getThemeStyles(theme,'common/common.scss')

    if (!authentication || authentication.isFetching === true || !authentication.user || !authentication.user.access_token){
      // If no user connected, display the error component
      return <ApplicationErrorComponent />
    } else if (this.props.children){
      // If a children of this container is defined display it.
      // The children is set by react-router if any child route is reached.
      // The possible children of portal are define in the main routes.js.
      return (<div>{this.props.children}</div>)
    } else {
      // Else, display the portal
      return (
      <div className={styles.main}>
        <InstanceComponent styles={styles}/>
        <ProjectsContainer styles={styles}/>
        <SelectThemeComponent
          styles={commonStyles}
          themes={["cdpp","ssalto","default"]}
          curentTheme={theme}
          onThemeChange={this.props.initTheme} />
      </div>
    )
  }
  }
}

// Add props from store to the container props
const mapStateToProps = (state) => {
  return {
    theme: state.common.theme,
    authentication: state.common.authentication
  }
}
// Add functions dependending on store dispatch to container props.
const mapDispatchToProps = (dispatch) => {
  return {
    publicAuthenticate: () => dispatch(fetchAuthenticate("public","public")),
    initTheme: (theme) =>  dispatch(setTheme(theme))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(PortalApp)