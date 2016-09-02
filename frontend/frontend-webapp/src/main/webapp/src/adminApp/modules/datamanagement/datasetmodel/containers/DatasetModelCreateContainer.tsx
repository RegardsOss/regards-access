import * as React from "react"
import I18nProvider from "../../../../../common/i18n/I18nProvider"
import { connect } from "react-redux"
import { ModelAttribute } from "../ModelAttribute"
import { addDatasetModel } from "../actions"
import DatasetModelCreateComponent from "../components/add/DatasetModelCreateComponent"
import { browserHistory } from "react-router"

/**
 */
interface ModelCreateProps {
  // From router
  params: any
  // From mapDispatchToProps
  addDatasetModel?: (id: number, name: string, attributes: Array<ModelAttribute>) => void
}
export class ModelCreateContainer extends React.Component<ModelCreateProps, any> {

  getCancelUrl = () => {
    const from = this.props.params.from
    if (from) {
      const fromURI = decodeURIComponent(from)
      return fromURI
    } else {
      const projectName = this.props.params.project
      return "/admin/" + projectName + "/datamanagement/datasetmodel"
    }
  }

  handleNextStep = (name: string, attributes: Array<ModelAttribute>) => {
    const id = Math.floor(Math.random() * 60) + 10
    this.props.addDatasetModel(id, name, attributes)
    browserHistory.push(this.getCancelUrl())
  }

  render (): JSX.Element {
    return (
      <I18nProvider messageDir='adminApp/modules/datamanagement/i18n'>
        <DatasetModelCreateComponent
          getCancelUrl={this.getCancelUrl}
          handleNextStep={this.handleNextStep}
        />
      </I18nProvider>
    )
  }
}
const mapDispatchToProps = (dispatch: any) => ({
  addDatasetModel: (id: number, name: string, attributes: Array<ModelAttribute>) => dispatch(addDatasetModel(id, name, attributes)),
})
export default connect<{}, {}, ModelCreateProps>(null, mapDispatchToProps)(ModelCreateContainer)
