import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Sidebar extends React.Component {
  static propTypes = {};
  static defaultProps = {};
  state = {
    isHidden: true
  };

  toggleSidebar = () => {
    this.setState({
      isHidden: !this.state.isHidden
    });
  };

  render() {
    const className = classnames({
      'translate__side-bar': true,
      'translate__side-bar--hide': this.state.isHidden,
    })
    return (
      <div className={className} onClick={this.toggleSidebar}>
        <div className="side-bar__toggle">
          {this.state.isHidden ? 'Expand' : 'Close'}
        </div>
      </div>
    );
  }
}

export default Sidebar;

