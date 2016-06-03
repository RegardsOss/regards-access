import React from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';

import { logout } from 'common/store/CommonActionCreators';
import { getThemeStyles } from 'common/utils/ThemeUtils';

class Menu extends React.Component {

  render(){
    const { dispatch, theme, project } = this.props;
    const styles = getThemeStyles(theme, 'adminApp/menu');
    return (
        <nav>
          <IndexLink to={"/admin/" + project}
             className={styles.unselected}
             activeClassName={styles.selected}>
             Home
          </IndexLink>
          <Link to={"/admin/"+project+"/test"}
            className={styles.unselected}
            activeClassName={styles.selected}>
            TestModule
          </Link>
          <span className={styles.unselected}
            onClick={() => {
              dispatch(logout());
            }}>Log out</span>
        </nav>
      )
  }
}
Menu.contextTypes = {
  router: React.PropTypes.object,
  route : React.PropTypes.object
}
const mapStateToProps = (state) => {
  return {
    theme: state.theme
  }
}
export default connect(mapStateToProps)(Menu);
