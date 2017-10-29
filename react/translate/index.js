import React from 'react';
import PropTypes from 'prop-types';
import groupBy from 'lodash/groupBy';

import All from './All';
import Sidebar from './Sidebar';
import * as api from './api';

class Translate extends React.Component {
  static propTypes = {};
  static defaultProps = {};
  state = {
    translates: {},
    isLoading: true,
  };


  render() {
    return (
      <div className="translate-container">
        <Sidebar />
        <All />
      </div>
    );
  }
}

export default Translate;


