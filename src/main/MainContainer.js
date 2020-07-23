import React from 'react';
import AlertState from '../context/alert/AlertState';
import GithubState from '../context/github/GithubState';
import Main from './Main';

const Container = () => {
  return (
    <GithubState>
      <AlertState>
        <Main />
      </AlertState>
    </GithubState>
  );
};

export default Container;
