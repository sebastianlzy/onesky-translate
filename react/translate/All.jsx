import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import get from 'lodash/get';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

import log from '../../common/log';
import TranslateRowValue from './TranslateRowValue';
import LoadingCircle from '../common/LoadingCircle';
import * as api from './api';
import CtaButtons from './CtaButtons';
import Search from './Search';

class All extends React.Component {
  static propTypes = {
    translates: PropTypes.object,
    isLoading: PropTypes.bool,
    getTranslationValues: PropTypes.func,
  };

  static defaultProps = {
    translates: {},
    isLoading: true,
  };

  state = {
    translates: {},
    newTranslates: {},
    isLoadingByKey: {},
  };

  componentWillMount = () => {
    this.setState({translates: this.props.translates});
  };

  componentWillReceiveProps = (nextProps, nextContext) => {
    if(!isEqual(this.props.translates, nextProps.translates)){
      this.setState({translates: nextProps.translates});
    }
  };


  handleValueChange = (key, idx) => (evt) =>{
    const newTranslates = {
      ...this.state.newTranslates,
    };
    newTranslates[key][idx]['text'] = evt.target.value;
    newTranslates[key][idx]['isDirty'] = true;
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

    api.updateKeys(this.state.translates[key])
      .then((resp) => {
        log.debug('Successfully posted to one sky :: ', resp);
        return null;
      })
      .then(() => {
        const newTranslates = this.state.newTranslates;
        delete newTranslates[key];
        this.setState({newTranslates});
        return null;
      })
      .then(() => this.props.getTranslationValues())
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
          onBlur={this.handleValueChange(key, idx)}
          translation={displayTranslation}
          translationKey={key}
          isEditable={isEditable}
        />
      );
    });
  };

  renderTranslateRow = (translations, key) => {
    const isEditable = get(this.state.newTranslates, `${key}.isEditable`, false);
    if (!includes(get(translations, '0.key', ''), this.state.searchValue) && !isEmpty(this.state.searchValue)) {
      return null;
    }

    return (
      <div className="translate__row-key" key={key}>
        <div className="translate__key">
          <div className="translate__key-value" id={key}>
             {key}
          </div>
        </div>
        <div className="translate__value">
          {this.renderTranslate(translations, key)}
        </div>
        <CtaButtons
          onEdit={() => this.handleClickEdit(key)}
          isEditable={isEditable}
          onUpdate={() => this.handleClickUpdateBtn(key)}
        />

        <div className="clearfix"></div>
      </div>
    );
  };

  handleSearchValue = (evt) => {
    const searchValue = get(evt, 'target.value');
    this.setState({searchValue});
  };

  render() {
    if (this.props.isLoading) {
      return (
        <div className="translate__all">
          <LoadingCircle />
        </div>
      );
    }
    return (
      <div className="translate__all">
        <Search onChange={this.handleSearchValue}/>
        {map(this.state.translates, this.renderTranslateRow)}
      </div>
    );
  }
}

export default All;

