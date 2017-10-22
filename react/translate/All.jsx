import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import get from 'lodash/get';

import request from '../../common/request';
import log from '../../common/log';
import TranslateRowValue from './TranslateRowValue';
import LoadingCircle from '../common/LoadingCircle';

class All extends React.Component {
  state = {
    translates: {},
    newTranslates: {},
    isLoadingByKey: {},
    isLoading: true,
  };

  componentWillMount = () => {
    this.getTranslationValues()
      .then(() => {
        this.setState({isLoading: false});
    });
  };

  getTranslationValues = () => {
    return request.get(window.location.origin + '/translate/all')
      .then((resp) => {
        this.setState({translates: groupBy(JSON.parse(resp), 'key')});
      })
      .catch((err) => log.error(err));
  };

  handleValueChange = (key, idx) => (evt) =>{
    const newTranslates = {
      ...this.state.newTranslates,
    };
    newTranslates[key][idx]['text'] = evt.target.value;
    newTranslates[key]['isDirty'] = true;
    this.setState({newTranslates: newTranslates});
  };

  handleClickEdit = (key) => {
    const newTranslates = {
      [key]: {...this.state.translates[key]},
    };
    newTranslates[key]['isEditable'] = !get(this.state.newTranslates, `${key}.isEditable`, false);

    this.setState({newTranslates: newTranslates});
  };

  toggleLoadingStateByKey = (key) => {
    return this.setState({
      isLoadingByKey: {
        ...this.state.isLoadingByKey,
        [key]: !this.state.isLoadingByKey[key],
      }
    });
  };
  
  handleClickUpdateBtn = (key) => {
    this.toggleLoadingStateByKey(key);

    request({
      url: window.location.origin + '/translate/update',
      json: this.state.translates[key],
      method: 'POST'
    })
      .then((resp) => {
        log.debug('Successfully posted to one sky :: ', resp);
        return null;
      })
      .then(() => {
        const newTranslates = this.state.newTranslates;
        delete newTranslates[key];
        this.setState({newTranslates});
      })
      .then(() => {
        return new Promise((resolve, reject) => {
          setTimeout(
            () => this.getTranslationValues().then(resolve).catch(reject),
            100
          );
        });
      })
      .then(() => this.toggleLoadingStateByKey(key))
      .catch((err) => log.error(err));
  };

  renderTranslate = (translations, key) => {
    const isEditable = get(this.state.newTranslates, `${key}.isEditable`, false);
    if (get(this.state.isLoadingByKey, key)) {
      return (
        <div className="translate__loading">
          <LoadingCircle />
        </div>
      );
    }

    return map(translations, (translation, idx) => {
      const displayTranslation = get(this.state.newTranslates, `${key}.${idx}`, translation);

      return (
        <TranslateRowValue
          key={`${key}-${idx}`}
          handleValueChange={this.handleValueChange(key, idx)}
          translation={displayTranslation}
          translationKey={key}
          isEditable={isEditable}
        />
      );
    });
  };

  renderUpdateBtn = (key) => {
    return (
      <div className="translate__update-btn-container">
        <div
          className="btn btn-outline-danger btn-sm float-right translate__update-btn"
          onClick={() => this.handleClickUpdateBtn(key)}
        >
          Update
        </div>
        <div className="clearfix"></div>
      </div>
    );
  };

  renderEditBtn = (key, isEditable) => {
    return (
      <div
        className="translate__edit-btn btn btn-outline-info btn-sm float-right"
        onClick={() => this.handleClickEdit(key)}
      >
        {isEditable ? 'Cancel' : 'Edit'}
      </div>
    );
  };

  renderTranslateRow = (translations, key) => {
    const isEditable = get(this.state.newTranslates, `${key}.isEditable`, false);
    const isDirty = get(this.state.newTranslates, `${key}.isDirty`, false);

    return (
      <div className="translate__row-key" key={key}>
        <div className="translate__key">
          <div className="translate__key-value">
            <a
              href={`https://shopback.oneskyapp.com/collaboration/translate/project/project/73377/language-from/310/language/310/#/?keyword=${key}`}
              target="_blank"
            >
               {key}
            </a>
          </div>
        </div>
        <div className="translate__value">
          {this.renderTranslate(translations, key)}
        </div>
        {this.renderEditBtn(key, isEditable)}
        {isDirty ? this.renderUpdateBtn(key) : null}

        <div className="clearfix"></div>
      </div>
    );
  };


  render() {
    if (this.state.isLoading) {
      return (
        <div className="translate__all">
          <LoadingCircle />
        </div>
      );
    }
    return (
      <div className="translate__all">
        {map(this.state.translates, this.renderTranslateRow)}
      </div>
    );
  }
}

export default All;

