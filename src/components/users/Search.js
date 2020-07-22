import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  state = {
    inputText: '',
  };

  onTextChange = (e) => this.setState({ inputText: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.inputText === '') {
      this.props.setAlert('Please enter something', 'warning');
    } else {
      this.props.searchUsers(this.state.inputText);
      this.setState({ inputText: '' });
    }
  };
  render() {
    const { showClear, clearUsers } = this.props;
    return (
      <div>
        <form className='form'>
          <input
            type='text'
            name='text'
            placeholder='Search Users...'
            value={this.state.inputText}
            onChange={this.onTextChange}
          />
          <input
            type='submit'
            value='search'
            className='btn btn-dark btn-block'
            onClick={this.onSubmit}
          />
        </form>
        {showClear && (
          <button className='btn btn-light btn-block' onClick={clearUsers}>
            Clear
          </button>
        )}
      </div>
    );
  }
  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  };
}

export default Search;
