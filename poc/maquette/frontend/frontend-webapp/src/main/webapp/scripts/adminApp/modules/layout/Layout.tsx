/** @module AdminLayout */
import * as React from 'react'
import { connect } from 'react-redux'

import I18nProvider from '../../../common/i18n/I18nProvider'
import MenuComponent from './components/MenuComponent'
import Home from '../home/Home'

// Styles
import { getThemeStyles } from '../../../common/theme/ThemeUtils'
var classnames = require('classnames')

interface LayoutProps {
  location: any,
  content: any,
  project: string,
  onLogout: () => void
  // Properties set by react-redux connection
  theme?: string,
}

/**
 * React container for admin application layout.
 * @prop {Object} location   React-router location
 * @prop {Any}    content    React component to display in layout content zone
 * @prop {String} project    Project name of the admin application
 * @prop {Function} onLogout Callback for logout
 */
class Layout extends React.Component<LayoutProps, any> {
  render(){
    // Add location to menu props in order to update view if location
    // change. This enable the activeClassName to update in the react
    // router links.
    const { theme, project, location, onLogout } = this.props;
    const styles = getThemeStyles(theme, 'adminApp/styles')
    const layoutClassName = classnames(styles['layout'], styles['row'])
    const contentClassName = classnames(styles['content'], styles['small-12'], styles['large-11'], styles['columns'])

    return (
      <I18nProvider messageDir="adminApp/modules/layout/i18n">
        <div className={layoutClassName}>
          <MenuComponent
            theme={theme}
            onLogout={onLogout}
            project={project}
            location={location}/>
          <div className={contentClassName}>
            {this.props.content || <Home />}
          </div>
        </div>
      </I18nProvider>
    );
  }
}

// Add theme from store to the component props
const mapStateToProps = (state: any) => ({
  theme: state.common.theme
})
export default connect<{}, {}, LayoutProps>(mapStateToProps)(Layout)
