/** @module AdminMenu */
import * as React from "react"
import { Link } from "react-router"
import Drawer from "material-ui/Drawer"
import MenuItem from "material-ui/MenuItem"
import PowerSettingsNew from "material-ui/svg-icons/action/power-settings-new"
import Divider from "material-ui/Divider"
import Settings from "material-ui/svg-icons/action/settings"
import Chat from "material-ui/svg-icons/communication/chat"
import VerifiedUser from "material-ui/svg-icons/action/verified-user"
import AddBox from "material-ui/svg-icons/content/add-box"
import CloudQueue from "material-ui/svg-icons/file/cloud-queue"
import Widgets from "material-ui/svg-icons/device/widgets"
import Brush from "material-ui/svg-icons/image/brush"
import Reply from "material-ui/svg-icons/content/reply"
import { intlShape, FormattedMessage } from "react-intl"
import { ThemeContextType } from "../../../../common/theme/ThemeContainerInterface"
import { HateoasControlledSidebarElement } from "./SidebarElement"
import SupervisorAccount from "material-ui/svg-icons/action/supervisor-account"
/**
 * React Menu component. Display the admin application menu
 */
class MenuComponent extends React.Component<any, any> {

  static contextTypes: Object = {
    intl: intlShape,
    muiTheme: ThemeContextType.muiTheme
  }
  context: any

  render (): JSX.Element {

    const style = {
      sidebarContainer: {
        classes: this.context.muiTheme.adminApp.layout.sidebarContainer.classes.join(' '),
        styles: this.context.muiTheme.adminApp.layout.sidebarContainer.styles,
      },
      link: {
        styles: this.context.muiTheme.linkWithoutDecoration
      }
    }
    return (
      <Drawer open={true} containerStyle={style.sidebarContainer.styles} className={style.sidebarContainer.classes}>
        <HateoasControlledSidebarElement
          endpointKey='projects_url'
          key='0'
          to={"/admin/cdpp/projects"}
          linkStyle={style.link.styles}
          primaryText={<FormattedMessage id="menu.projects"/>}
          leftIcon={<Settings />}
        />
        <HateoasControlledSidebarElement
          endpointKey='projects_users_url'
          key='1'
          to={"/admin/cdpp/users"}
          linkStyle={style.link.styles}
          primaryText={<FormattedMessage id="menu.users"/>}
          leftIcon={<SupervisorAccount />}
        />
        <HateoasControlledSidebarElement
          endpointKey='projects_connections_url'
          key='2'
          to={"/admin/cdpp/datamanagement"}
          linkStyle={style.link.styles}
          primaryText={<FormattedMessage id="menu.datamanagement"/>}
          leftIcon={<AddBox />}
        />
        <HateoasControlledSidebarElement
          endpointKey='projects_connections_url'
          key='3'
          to={"/admin/cdpp/datamanagement"}
          linkStyle={style.link.styles}
          primaryText={<FormattedMessage id="menu.dataaccessrights"/>}
          leftIcon={<VerifiedUser />}
        />
        <HateoasControlledSidebarElement
          endpointKey='projects_connections_url'
          key='4'
          to={"/admin/cdpp/datamanagement"}
          linkStyle={style.link.styles}
          primaryText={<FormattedMessage id="menu.forms"/>}
          leftIcon={<Widgets />}
        />
        <HateoasControlledSidebarElement
          endpointKey='projects_connections_url'
          key='5'
          to={"/admin/cdpp/datamanagement"}
          linkStyle={style.link.styles}
          primaryText={<FormattedMessage id="menu.microservices"/>}
          leftIcon={<CloudQueue />}
        />
        <HateoasControlledSidebarElement
          endpointKey='projects_connections_url'
          key='6'
          to={"/admin/cdpp/datamanagement"}
          linkStyle={style.link.styles}
          primaryText={<FormattedMessage id="menu.ui.configuration"/>}
          leftIcon={<Brush />}
        />
        <HateoasControlledSidebarElement
          endpointKey='projects_connections_url'
          key='7'
          to={"/admin/cdpp/datamanagement"}
          linkStyle={style.link.styles}
          primaryText={<FormattedMessage id="menu.news"/>}
          leftIcon={<Chat />}
        />

        <Divider />
        <MenuItem primaryText={<FormattedMessage id="menu.logout"/>} leftIcon={<PowerSettingsNew />}/>
        <Divider />
        <Link to={"/admin/cdpp"} style={style.link.styles}>
          <MenuItem primaryText={<FormattedMessage id="menu.back"/>} leftIcon={<Reply />}/>
        </Link>
      </Drawer>
    )
  }
}

export default MenuComponent