import * as React from 'react'
import { connect } from 'react-redux'

import NavigationContainer from './containers/NavigationContainer'

interface LayoutProps {
  project: string,
  location: any
}

class Layout extends React.Component<LayoutProps, any> {

  render(){
    return (
      <div className="full-div">
        <div className="header">
          <h1> Test Application {this.props.project} </h1>
        </div>
        <NavigationContainer project={this.props.project} location={this.props.location}/>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Layout