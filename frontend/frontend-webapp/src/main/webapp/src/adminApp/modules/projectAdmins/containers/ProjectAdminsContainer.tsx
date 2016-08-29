/** @module AdminProjectAdmins */
import * as React from "react"
import { connect } from "react-redux"
import { ProjectAdmin } from "../types"
import UserList from "../components/UserList"
import MenuItem from "material-ui/MenuItem"
import Build from "material-ui/svg-icons/action/build"
import Delete from "material-ui/svg-icons/action/delete"
import UserDialog from "../components/UserDialog"
import * as actions from "../actions"
import * as selectors from "../../../reducer"

interface ProjectAdminsProps {
  // From mapStateToProps
  project?: any,
  projectAdmins?: Array<any>,
  selectedProjectAdminId?: string,
  // From mapDispatchToProps
  updateOrCreateProjectAdmin?: (id: string, payload: ProjectAdmin) => void,
  fetchProjectAdminsBy?: any,
  deleteProjectAdmin?: any,
}

/**
 * React container to manage ProjectAdminsComponent.
 */
class ProjectAdminsContainer extends React.Component<ProjectAdminsProps, any> {
  state: any = {
    dialogOpen: false
  }
  componentWillReceiveProps(nextProps: any): any {
    const oldProject = this.props.project
    const nextProject = nextProps.project
    if (nextProject && nextProject !== oldProject) {
      const link = nextProject.links.find ((link: any) => link.rel === "users")
      if (link) {
        const href = link.href
        this.props.fetchProjectAdminsBy (href)
      }
    }
  }



  handleDeleteClick = (event: Object) => {
    this.props.deleteProjectAdmin (this.props.selectedProjectAdminId)
  }

  handleDialogOpen = () => {
    this.setState ({dialogOpen: true})
  }

  handleDialogClose = () => {
    this.setState ({dialogOpen: false})
  }

  handleDialogSave = () => {
    this.handleDialogClose ()
    this.props.updateOrCreateProjectAdmin ('9999', {name: 'Fake Name'})
  }

  render(): JSX.Element {
    const usersListMenuElements = [
      <MenuItem key={1} primaryText="Edit" leftIcon={<Build />} onTouchTap={this.handleDialogOpen}/>,
      <MenuItem key={2} primaryText="Delete" leftIcon={<Delete />} onTouchTap={this.handleDeleteClick}/>
    ]

    return (
      <div>
        <UserList
          subheader='Project administrators'
          items={this.props.projectAdmins}
          menuElements={usersListMenuElements}
        />
        <UserDialog
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose}
          onSave={this.handleDialogSave}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  const selectedProjectId = selectors.getSelectedProjectId (state)
  const selectedProject = selectors.getProjectById (state, selectedProjectId)
  const projectAdmins = selectors.getProjectAdmins (state) // TODO: By project: getProjectAdminsByProject(state, selectedProject)
  const selectedProjectAdminId = selectors.getSelectedProjectAdminId (state)
  return {
    project: selectedProject,
    projectAdmins: projectAdmins.items,
    selectedProjectAdminId: selectedProjectAdminId
  }
}
const mapDispatchToProps = (dispatch: any) => ({
  fetchProjectAdminsBy: (href: any) => dispatch (actions.fetchProjectAdminsBy (href)),
  updateOrCreateProjectAdmin: (id: string, payload: ProjectAdmin) => dispatch (actions.updateOrCreateProjectAdmin (id, payload)),
  deleteProjectAdmin: (id: string) => dispatch (actions.deleteProjectAdmin (id))
})
export default connect<{}, {}, ProjectAdminsProps> (mapStateToProps, mapDispatchToProps) (ProjectAdminsContainer)