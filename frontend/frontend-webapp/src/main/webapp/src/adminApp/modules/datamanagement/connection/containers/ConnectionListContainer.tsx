import * as React from "react"
import I18nProvider from "../../../../../common/i18n/I18nProvider"
import { Connection } from "../Connection"
import ConnectionListComponent from "../components/list/ConnectionListComponent"

interface ConnectionCreateProps {
  // From router
  params: any

  // From mapStateToProps
  connections?: Array<Connection>
}


/**
 */
export default class ConnectionListContainer extends React.Component<ConnectionCreateProps, any> {

  getBackUrl = () => {
    const projectName = this.props.params.project
    return "/admin/" + projectName + "/datamanagement"
  }

  getCreateUrl = () => {
    const projectName = this.props.params.project
    return "/admin/" + projectName + "/datamanagement/connection/create"
  }

  render (): JSX.Element {
    const { connections } = this.props
    return (
      <I18nProvider messageDir='adminApp/modules/datamanagement/i18n'>
        <ConnectionListComponent
          getBackUrl={this.getBackUrl}
          getCreateUrl={this.getCreateUrl}
          connections={connections}
        />
      </I18nProvider>
    )
  }
}
/*
 const mapStateToProps = (state: any, ownProps: any) => {
 const viewState = Selectors.getFormViewState(state)
 return {
 viewState: viewState
 }
 }
 const mapDispatchToProps = (dispatch: any) => ({
 setViewState: (newState: string) => dispatch(Actions.setViewState(newState))
 })
 export default connect<{}, {}, DatasetCreateProps>(mapStateToProps, mapDispatchToProps)(DatasetCreateContainer)
 */
