import * as React from 'react'
import { connect } from 'react-redux'
import { PluginType, PluginsStore } from './PluginTypes'
import { intializePlugin } from './PluginsActions'

interface PluginProps {
  plugin: PluginType
  // Properties set bu react redux connection
  plugins?: PluginsStore,
  pluginInitialized?: (action:any) => void
}
/**
 Display the content of a plugin.
*/
class PluginComponent extends React.Component<PluginProps, any> {

  render(){
    const { plugin } = this.props
    if (plugin && plugin.plugin){
      return React.createElement(plugin.plugin,null)
    } else {
      intializePlugin(plugin.paths, plugin.name,this.props.pluginInitialized)
      return <div className="error"> Undefined plugin </div>
    }
  }
}

const mapStateToProps = (state:any) => ({
  plugins: state.common.plugins
})

const mapDispatchToProps = (dispatch:any) => ({
  pluginInitialized: (action:any) => dispatch(action)
})

export default connect<{}, {}, PluginProps>(mapStateToProps,mapDispatchToProps)(PluginComponent)
