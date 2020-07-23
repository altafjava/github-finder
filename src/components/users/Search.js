import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';

const Search = ({ showAlert }) => {
  const githubContext = useContext(GithubContext);
  const [inputText, setInputText] = useState('');

  const onTextChange = (e) => setInputText(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (inputText === '') {
      showAlert('Please enter something', 'warning');
    } else {
      githubContext.searchUsers(inputText);
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
      {githubContext.users.length > 0 && (
        <button
          className='btn btn-light btn-block'
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};
Search.propTypes = {
  showAlert: PropTypes.func.isRequired,
};

export default Search;
