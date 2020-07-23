import Axios from 'axios';
import React, { Component, Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
import Users from './components/users/Users';
import Alert from './components/layout/Alert';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import About from './components/pages/About';
import User from './components/users/User';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  };
  async componentDidMount() {
    this.setState({ loading: true, alert: null });
    const response = await Axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ loading: false, users: response.data });
  }

  searchUsers = async (inputText) => {
    this.setState({ loading: true, alert: null });
    const response = await Axios.get(
      `https://api.github.com/search/users?q=${inputText}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ loading: false, users: response.data.items });
  };

  clearUsers = () => this.setState({ users: [], loading: false });

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  getUser = async (username) => {
    this.setState({ loading: true });
    const response = await Axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ loading: false, user: response.data });
  };
  getUserRepos = async (username) => {
    this.setState({ loading: true, alert: null });
    const response = await Axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ loading: false, repos: response.data });
  };
  render() {
    const { loading, users, user, repos } = this.state;
    return (
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={this.state.users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={(props) => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
