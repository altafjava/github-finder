import PropTypes from 'prop-types';
import React, { useState } from 'react';

const Search = ({ searchUsers, showClear, clearUsers, setAlert }) => {
  const [inputText, setInputText] = useState('');

  const onTextChange = (e) => setInputText(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (inputText === '') {
      setAlert('Please enter something', 'warning');
    } else {
      searchUsers(inputText);
      setInputText('');
    }
  };
  return (
    <div>
      <form className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          value={inputText}
          onChange={onTextChange}
        />
        <input
          type='submit'
          value='search'
          className='btn btn-dark btn-block'
          onClick={onSubmit}
        />
      </form>
      {showClear && (
        <button className='btn btn-light btn-block' onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};
Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Search;
