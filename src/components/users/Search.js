import React, { useContext, useState } from 'react';
import AlertContext from '../../context/alert/alertContext';
import GithubContext from '../../context/github/githubContext';

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  const [inputText, setInputText] = useState('');

  const onTextChange = (e) => setInputText(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    alertContext.removeAlert();
    if (inputText === '') {
      alertContext.showAlert('Please enter something', 'warning');
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

export default Search;
