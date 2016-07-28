import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import TextField from 'material-ui/TextField';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class ProjectUserCreateContainer extends React.Component<any, any> {
  context: any;
  static contextTypes: {
    muiTheme: Object
  }
  constructor(){
    super();
  }
  render () {
    console.log(this.context)
    return (
      <Card
        initiallyExpanded={true}
      >
        <CardHeader
          title="Create a new user"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText>
          <TextField
            hintText="Username"
            fullWidth={true}
          /><br />
          <TextField
            hintText="Email"
            fullWidth={true}
          /><br />
          <TextField
            hintText="Username"
            fullWidth={true}
          /><br />

          <SelectField>
            <MenuItem value={1} primaryText="Custom width" />
            <MenuItem value={2} primaryText="Every Night" />
            <MenuItem value={3} primaryText="Weeknights" />
            <MenuItem value={4} primaryText="Weekends" />
            <MenuItem value={5} primaryText="Weekly" />
          </SelectField>
        </CardText>
        <CardActions >
          <FlatButton label="Create user" />
          <FlatButton label="Cancel" />
        </CardActions>
      </Card>
    )
  }
}

export default ProjectUserCreateContainer;
// const mapStateToProps = (state: any) => ({
// });
// const mapDispatchToProps = (dispatch: any) => ({
//
// });
// export default connect<{}, {}, Object>(mapStateToProps, mapDispatchToProps)(ProjectUserCreateContainer);