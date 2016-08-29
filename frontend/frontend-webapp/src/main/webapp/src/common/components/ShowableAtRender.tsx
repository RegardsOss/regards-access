/** @module common */
import * as React from "react"

interface ShowableAtRenderProps {
  show: Boolean
}

interface ShowableAtRenderState {
  // TODO
}


/**
 * TODO
 */
class ShowableAtRender extends React.Component<ShowableAtRenderProps, ShowableAtRenderState> {

  render(): JSX.Element {
    if (this.props.show) {
      return <div>{this.props.children}</div>
    } else {
      return null
    }
  }
}

export default ShowableAtRender