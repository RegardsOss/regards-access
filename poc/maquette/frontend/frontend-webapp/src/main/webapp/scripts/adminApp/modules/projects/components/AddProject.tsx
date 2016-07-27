import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AddBox from 'material-ui/svg-icons/content/add-box'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import IconButton from 'material-ui/IconButton'

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class AddProject extends React.Component<any, any> {
  state = {
    open: false,
    value: ''
  };

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  handleSave = () => {
    this.handleClose()
    this.props.onSave(this.state.value)
  }

  handleChange = (event: any) => {
    this.setState({
      value: event.target.value,
    })
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSave}
      />,
    ];

    return (
      <div>
        <FlatButton
          primary={true}
          label="Add"
          onTouchTap={this.handleOpen}
          icon={<AddBox />} />
        <Dialog
          title="Add a new project"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            floatingLabelText="Project name"
            onChange={this.handleChange} />
        </Dialog>
      </div>
    );
  }
}
