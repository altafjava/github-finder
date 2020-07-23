import React, { Fragment, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Alert from '../components/layout/Alert';
import Navbar from '../components/layout/Navbar';
import About from '../components/pages/About';
import Home from '../components/pages/Home';
import NotFound from '../components/pages/NotFound';
import User from '../components/users/User';
import GithubContext from '../context/github/githubContext';

const Main = () => {
  const githubContext = useContext(GithubContext);
  useEffect(() => {
    async function fetchUsers() {
      githubContext.getUsers();
    }
    fetchUsers();
    //Mandatory comment to avoid warning in console [React Hook useEffect has a missing dependency: 'githubContext'. Either include it or remove the dependency array  react-hooks/exhaustive-deps]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
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
  );
};

export default Main;
