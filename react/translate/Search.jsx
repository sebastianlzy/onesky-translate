import React from 'react';
import PropTypes from 'prop-types';

const Search = (props) => {
  return (
    <div className="translate__search-bar">
      <input onChange={props.onChange} placeholder="Search here" type="text" className="translate__search-input"/>
    </div>
  );
};

Search.propTypes = {
  onChange: PropTypes.func,
};

export default Search;

