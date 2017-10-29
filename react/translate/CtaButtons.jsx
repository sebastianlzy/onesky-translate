import React from 'react';
import PropTypes from 'prop-types';

const CtaButtons = (props) => {
  if (props.isEditable) {
    return (
      <div className="translate__cta-btns">
        <div
          className="translate__edit-btn btn btn-outline-info btn-sm float-right"
          onClick={props.onEdit}
        >
          Cancel
        </div>
        <div className="translate__update-btn-container">
          <div
            className="btn btn-outline-danger btn-sm float-right translate__update-btn"
            onClick={props.onUpdate}
          >
            Update
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="translate__cta-buttons">
      <div
        className="translate__edit-btn btn btn-outline-info btn-sm float-right"
        onClick={props.onEdit}
      >
        Edit
      </div>
    </div>
  );
};

CtaButtons.propTypes = {
  isEditable: PropTypes.bool,
  onEdit: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default CtaButtons;

