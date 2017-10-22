import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

class TranslateRowValue extends React.Component {
  static propTypes = {
    handleValueChange: PropTypes.func,
    translation: PropTypes.object,
    isEditable: PropTypes.bool,
  };
  static defaultProps = {};
  state = {};

  shouldComponentUpdate(nextProps) {
    if (this.props.isEditable !== nextProps.isEditable) {
      return true;
    }

    if (this.props.translation === nextProps.translation && !nextProps.isEditable) {
      return false;
    }
    return true;
  }

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
          <div className="translate__locale">
            {translation.locale}
          </div>
        </div>
      );
    }
    return (
      <div className="translate__row-value">
        <div className="translate__text translate__text--disabled">
          {JSON.stringify(translation.text)}
        </div>

        <div className="translate__locale">
          {translation.locale}
        </div>
      </div>
    );
  }
}

export default TranslateRowValue;

