import React, { Component } from 'react';

class Search extends Component {
  state = {
    inputText: '',
  };

  onTextChange = (e) => this.setState({ inputText: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
  };
  render() {
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
      </div>
    );
  }
}

export default Search;
