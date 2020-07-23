import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import About from './components/pages/About';
import Home from './components/pages/Home';
import User from './components/users/User';
import AlertState from './context/alert/AlertState';
import GithubState from './context/github/GithubState';
import NotFound from './components/pages/NotFound';

const App = () => {
  // useEffect(() => {
  //   async function fetchUsers() {
  //     const response = await Axios.get(
  //       `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //     );
  //     setUsers(response.data);
  //   }
  //   fetchUsers();
  // }, []);

  return (
    <GithubState>
      <AlertState>
        <BrowserRouter>
          <Fragment>
            <Navbar />
            <div className='container'>
              <Alert />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/user/:login' component={User} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </Fragment>
        </BrowserRouter>
      </AlertState>
    </GithubState>
  );
};

export default App;
