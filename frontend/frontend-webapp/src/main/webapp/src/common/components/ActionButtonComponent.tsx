import * as React from "react"
import FlatButton from "material-ui/FlatButton"
import RaisedButton from "material-ui/RaisedButton"
import ShowableAtRender from "./ShowableAtRender"
import { Link } from "react-router"

/**
 * A generic button used for UI actions
 *
 * It can handle actions defined as:
 * - a url => it will use a <Link> component
 * - a onTouchTap callback
 */
interface ActionButtonProps {
  label: string | JSX.Element
  button?: any
  primary?: boolean
  secondary?: boolean
  style?: any
  url?: string
  onTouchTap?: (event: React.FormEvent) => void
  isVisible?: boolean
}
export default class ActionButtonComponent extends React.Component<ActionButtonProps, any> {

  onTouchTap = (event: any): void => {
    if(this.props.onTouchTap)
      this.props.onTouchTap(event)
  }

  static defaultProps = {
    label: "",
    button: RaisedButton,
    primary: true,
    secondary: false,
    style: {},
    url: "",
    onTouchTap: () => {},
    isVisible: true
  }

  render (): JSX.Element {

    return (
      <ShowableAtRender show={this.props.isVisible}>
      {(() => {
        if (this.props.url) {
          return (
            <Link
              to={this.props.url}
              style={this.props.style}>
              <this.props.button
                label={this.props.label}
                primary={this.props.primary ? true : this.props.secondary ? false : false}
                secondary={this.props.secondary ? true : this.props.primary ? false : false}
              />
            </Link>
          )
        } else {
          return (
            <this.props.button
              label={this.props.label}
              primary={this.props.primary}
              secondary={this.props.secondary}
              onTouchTap={this.onTouchTap}
            />
          )
        }
      })()}
      </ShowableAtRender>
    )

  }
}
