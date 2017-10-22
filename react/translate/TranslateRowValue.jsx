import React from 'react';
import PropTypes from 'prop-types';
import trim from 'lodash/trim';

class TranslateRowValue extends React.Component {
  static propTypes = {
    handleValueChange: PropTypes.func,
    translation: PropTypes.object,
    isEditable: PropTypes.bool,
    translationKey: PropTypes.string,
  };

  shouldComponentUpdate(nextProps) {
    if (this.props.isEditable !== nextProps.isEditable) {
      return true;
    }

    if (this.props.translation === nextProps.translation && !nextProps.isEditable) {
      return false;
    }
    return true;
  }

  generateOneskyUrl = (locale, key) => {
    const languageId = {
      'en-sg': 310,
      'en-my': 606,
      'th-th': 56,
      'en-ph': 309,
      'id-id': 54,
      'zh-tw': 2
    };

    return `https://shopback.oneskyapp.com/collaboration/translate/project/project/73377/language-from/310/language/${languageId[trim(locale)]}/#/?keyword=${key}`;
  };

  renderLocale = () => {
    return (
      <div className="translate__locale">
        <a target="_blank" href={this.generateOneskyUrl(this.props.translation.locale, this.props.translationKey)}>
          {this.props.translation.locale}
        </a>
      </div>
    );
  };

  render() {
    const {isEditable, translation} = this.props;
    if (isEditable) {
      return (
        <div className="translate__row-value">
          <input
            type="text"
            className="translate__text"
            defaultValue={translation.text || ''}
            onBlur={this.props.handleValueChange}
          />
          {this.renderLocale()}
        </div>
      );
    }
    return (
      <div className="translate__row-value">
        <div className="translate__text translate__text--disabled">
          {JSON.stringify(translation.text)}
        </div>

        {this.renderLocale()}
      </div>
    );
  }
}

export default TranslateRowValue;

