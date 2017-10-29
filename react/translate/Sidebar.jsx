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

  componentWillMount = () => {
    const map = {68: false, 69: false};
    window.onkeydown = (e) => {
      const key = e.keyCode ? e.keyCode : e.which;
      console.log('key -', key);
      if (key === 68) {
        map[68] = true;
      }
      if (key === 69) {
        map[69] = true;
      }
      console.log('toggle -', map);
      console.log('key -', key);
      if (map[68] && map[69]) {
        
        this.toggleSidebar();
      }
    };

    window.onkeyup = (e) => {
      if (e.keyCode in map) {
        map[e.keyCode] = false;
      }
    };
  };


  toggleSidebar = () => {
    this.setState({
      isHidden: !this.state.isHidden
    });
  };

  renderAllKeys = () => {
    const result = [];
    for (let translateKey in this.props.translates) {
      result.push((
        <a href={`#${translateKey}`} key={translateKey} className="side-bar__translate-key">{translateKey}</a>));
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
          Toggle with D + E
        </div>
        {this.renderAllKeys()}
      </div>
    );
  }
}

export default Sidebar;

