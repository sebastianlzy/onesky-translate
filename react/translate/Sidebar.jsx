import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import map from 'lodash/map';

class Sidebar extends React.Component {
  static propTypes = {
    translates: PropTypes.object,
  };
  static defaultProps = {};
  state = {
    isHidden: true
  };

  toggleSidebar = () => {
    this.setState({
      isHidden: !this.state.isHidden
    });
  };

  renderAllKeys = () => {
    const result = [];
    for (let translateKey in this.props.translates) {
      result.push((<a href={`#${translateKey}`} key={translateKey} className="side-bar__translate-key">{translateKey}</a>));
    }
    return result;
  };

  render() {
    const className = classnames({
      'translate__side-bar': true,
      'translate__side-bar--hide': this.state.isHidden,
    });
    return (
      <div className={className}>
        <div className="side-bar__toggle" onClick={this.toggleSidebar}>
          {this.state.isHidden ? 'All Keys' : 'Close'}
        </div>
        {this.renderAllKeys()}
      </div>
    );
  }
}

export default Sidebar;

