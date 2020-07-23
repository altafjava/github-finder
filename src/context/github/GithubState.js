import React, { useReducer } from 'react';
import Axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  CLEAR_USERS,
  GET_USER,
  REMOVE_ALERT,
  GET_REPOS,
  SEARCH_USERS,
  SET_ALERT,
  SET_LOADING,
} from '../types';

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  //Get User repos
  const getUserRepos = async (username) => {
    setLoading();
    setAlert();
    const response = await Axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({ ...state, type: GET_REPOS, payload: response.data });
  };
  //Get single User
  const getUser = async (username) => {
    setLoading();
    const response = await Axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({ type: GET_USER, payload: response.data });
  };
  //Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  //Search Users
  const searchUsers = async (inputText) => {
    setLoading();
    setAlert();
    const response = await Axios.get(
      `https://api.github.com/search/users?q=${inputText}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({ type: SEARCH_USERS, payload: response.data.items });
  };

  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  //Set Alert
  const setAlert = () => dispatch({ type: SET_ALERT });

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
