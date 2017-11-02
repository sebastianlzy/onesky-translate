import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import get from 'lodash/get';
import mapValues from 'lodash/mapValues';

import * as api from './api';

class Sidebar extends React.Component {
  static propTypes = {
    translates: PropTypes.object,
  };
  static defaultProps = {};
  state = {
    isHidden: true,
    isKeyVisible: {
      all: false,
      cashout: true
    },
    bookmarks: {}
  };

  componentDidMount = () => {
    this.setupKeyupShortcutForExpandingSidebar();
    this.getBookmarks();
  };

  setupKeyupShortcutForExpandingSidebar = () => {
    const map = {68: false, 69: false};
    window.onkeydown = (e) => {
      const key = e.keyCode ? e.keyCode : e.which;
      if (key === 68) {
        map[68] = true;
      }
      if (key === 69) {
        map[69] = true;
      }
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

  getBookmarks = () => {
    return api.getBookmarks().then((resp) => {
      const cashout = {};
      mapValues(get(JSON.parse(resp), 'bookmarks.cashout'), (value) => {
        Object.assign(cashout, value);
      });

      this.setState({
        bookmarks: {cashout}
      });
    });
  };

  toggleSidebar = () => {
    this.setState({
      isHidden: !this.state.isHidden
    });
  };

  renderAllKeys = (translateKeys) => {
    const result = [];
    for (let translateKey in translateKeys) {
      result.push((
        <li key={translateKey} className="side-bar__translate-key">
          <a href={`#${translateKey}`}>{translateKey}</a>
        </li>
      ));
    }
    return result;
  };

  toggleGroupKeyVisibility = (key) => (evt) => {
    evt.preventDefault();
    this.setState({
      isKeyVisible: {
        ...this.state.isKeyVisible,
        [key]: !get(this.state, `isKeyVisible.${key}`, false)
      }
    });
  };

  getClassNameForBookmark = (key) => {
    return classnames({
      'side-bar__translate-keys--visible': this.state.isKeyVisible[key],
      'side-bar__translate-keys': true,
    });
  };

  render() {
    const className = classnames({
      'translate__side-bar': true,
      'translate__side-bar--hide': this.state.isHidden,
    });

    return (
      <div className={className}>
        <div className="side-bar__toggle" onClick={this.toggleSidebar}>
          +/-
        </div>
        <div className="side-bar__group">
          <div className="side-bar__group-key" onClick={this.toggleGroupKeyVisibility('all')}>
            All
          </div>
          <ul className={this.getClassNameForBookmark('all')}>
            {this.renderAllKeys(this.props.translates)}
          </ul>
          <div className="side-bar__group-key" onClick={this.toggleGroupKeyVisibility('cashout')}>
            Cashout
          </div>
          <ul className={this.getClassNameForBookmark('cashout')}>
            {this.renderAllKeys(this.state.bookmarks.cashout)}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;

