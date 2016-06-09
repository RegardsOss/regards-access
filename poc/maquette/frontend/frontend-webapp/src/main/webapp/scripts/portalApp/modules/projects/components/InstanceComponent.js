import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Project from './ProjectComponent'
import { getThemeStyles } from 'common/theme/ThemeUtils';

class InstanceComponent extends React.Component {

  render(){
    const styles = getThemeStyles(this.props.theme, 'portalApp/styles');
    return (
      <div className={styles["instance-link"]}>
        Accès direct à l'ihm d'administration de l'instance :
        <Link to={"/admin/instance"}>ihm admin instance</Link><br/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    theme: state.theme
  }
}
export default connect(mapStateToProps)(InstanceComponent);
