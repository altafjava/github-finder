import React, { useReducer } from 'react';
import Axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  CLEAR_USERS,
  GET_USER,
  GET_USERS,
  GET_REPOS,
  SEARCH_USERS,
  SET_ALERT,
  SET_LOADING,
} from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

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
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    dispatch({ ...state, type: GET_REPOS, payload: response.data });
  };

  //Get single User
  const getUser = async (username) => {
    setLoading();
    const response = await Axios.get(
      `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    dispatch({ type: GET_USER, payload: response.data });
  };

  //Get Multi Users
  const getUsers = async () => {
    setLoading();
    setAlert();
    const response = await Axios.get(
      `https://api.github.com/users?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    dispatch({ type: GET_USERS, payload: response.data });
  };

  //Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  //Search Users
  const searchUsers = async (inputText) => {
    setLoading();
    setAlert();
    const response = await Axios.get(
      `https://api.github.com/search/users?q=${inputText}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
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
        getUsers,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
