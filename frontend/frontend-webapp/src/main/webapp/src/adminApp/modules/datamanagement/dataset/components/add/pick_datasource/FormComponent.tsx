import * as React from "react"
import { Card, CardHeader, CardText, CardTitle } from "material-ui/Card"
import { FormattedMessage } from "react-intl"
import SelectField from "material-ui/SelectField"
import MenuItem from "material-ui/MenuItem"
import FlatButton from "material-ui/FlatButton"
import CancelButtonComponent from "../../../../components/CancelButtonComponent"
import MainButtonComponent from "../../../../components/MainButtonComponent"


interface FormProps {
  handleNextStep: () => void
  handleGetBack: () => void
}
/**
 */
class FormComponent extends React.Component<FormProps, any> {

  getBackUrl = () => {
    return this.props.handleGetBack()
  }

  handleNextButton = () => {
    return this.props.handleNextStep()
  }

  render (): JSX.Element {
    const styleCardActions = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end"
    }
    const isNextButtonVisible = false
    return (
      <Card
        initiallyExpanded={true}>
        <CardTitle
          title={<FormattedMessage id="datamanagement.dataset.add.header"/>}
          children={this.props.children}
        />
        <CardText>
          <div>
            <SelectField
              floatingLabelText="Type de source de données"
              value={3}
            >
              <MenuItem value={1} primaryText="Oracle"/>
              <MenuItem value={2} primaryText="Mysql"/>
              <MenuItem value={3} primaryText="PostgreSQL"/>
              <MenuItem value={4} primaryText="Weekends"/>
              <MenuItem value={5} primaryText="Weekly"/>
            </SelectField>
            <FlatButton label="Add datasource" primary={true}/>
          </div>
          <div style={styleCardActions}>

            <CancelButtonComponent
              label="Back"
              onTouchTap={this.getBackUrl}
            />
            <MainButtonComponent
              label="Next"
              onTouchTap={this.handleNextButton}
              isVisible={isNextButtonVisible}
            />
          </div>
        </CardText>
      </Card>
    )
  }
}

export default FormComponent