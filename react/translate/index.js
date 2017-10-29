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

  componentWillMount = () => {
    this.getTranslationValues();
  };

  getTranslationValues = () => {
    this.setState(() => ({isLoading: true}));

    return api.getTranslationValues()
      .then((resp) => {
        const translates = groupBy(JSON.parse(resp), 'key');
        this.setState(() => ({translates, isLoading: false}));
      });
  };

  render() {
    return (
      <div className="translate-container">
        <Sidebar
          translates={this.state.translates}
        />
        <All
          getTranslationValues={this.getTranslationValues}
          translates={this.state.translates}
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }
}

export default Translate;


