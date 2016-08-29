import * as React from "react"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import UserForm from "./UserForm"

// TODO
interface HandlesUser {
  user: any
}

interface Openable {
  open: boolean,
  onClose: () => void
}

interface Savable {
  onSave: (args: any) => void
}

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class UserDialog extends React.Component<Openable & Savable, any> {

  render(): JSX.Element {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.onClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.onSave}
      />,
    ]

    return (
      <Dialog
        title="Edit a user"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.onClose}
        style={{zIndex:10000}}
      >
        <UserForm
          handleSubmit={null} // this.props.onUserFormSubmit
          onSubmit={null} // this.props.onUserFormSubmit
          onCancelClick={null}
        />
      </Dialog>
    )
  }
}

export default UserDialog