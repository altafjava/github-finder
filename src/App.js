import Axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import About from './components/pages/About';
import Search from './components/users/Search';
import User from './components/users/User';
import Users from './components/users/Users';
import GithubState from './context/github/GithubState';

const App = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // useEffect(() => {
  //   async function fetchUsers() {
  //     const response = await Axios.get(
  //       `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //     );
  //     setUsers(response.data);
  //   }
  //   fetchUsers();
  // }, []);

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert({ msg, type }), 5000);
  };

  const getUserRepos = async (username) => {
    setLoading(true);
    setAlert(null);
    const response = await Axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setLoading(false);
    setRepos(response.data);
  };
  return (
    <GithubState>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={() => (
                  <Fragment>
                    <Search
                      // clearUsers={clearUsers}
                      // showClear={users.length > 0 ? true : false}
                      showAlert={showAlert}
                    />
                    <Users />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={(props) => (
                  <User {...props} getUserRepos={getUserRepos} repos={repos} />
                )}
              />
            </Switch>
          </div>
        </Fragment>
      </BrowserRouter>
    </GithubState>
  );
};

export default App;
