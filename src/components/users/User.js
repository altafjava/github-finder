import React, { Component, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class User extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
  };
  componentDidMount = () => {
    this.props.getUser(this.props.match.params.login);
  };
  render() {
    const {
      login,
      avatar_url,
      html_url,
      name,
      location,
      hireable,
      bio,
      company,
      blog,
      public_repos,
      public_gists,
      followers,
      following,
    } = this.props.user;
    const { loading } = this.props;
    if (loading) return <Spinner />;
    return (
      <Fragment>
        <Link to='/' className='btn btn-light'>
          Back to Search
        </Link>
        Hireable : {''}
        {hireable ? (
          <i className='fas fa-check text-success' />
        ) : (
          <i className='fas fa-times-circle text-danger' />
        )}
        <div className='card grid-2'>
          <div className='all-center'>
            <img
              src={avatar_url}
              alt='avatar_url'
              className='round-img'
              style={{ width: '150px' }}
            />
            <h1>{name}</h1>
            <p>Location : {location}</p>
          </div>
          <div>
            {bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a
              href={html_url}
              className='btn btn-dark my-1'
              target='_blank'
              rel='noopener noreferrer'
            >
              Visit Github Profile
            </a>
            <ul>
              <li>
                {login && (
                  <Fragment>
                    <strong>Login : </strong>
                    {login}
                  </Fragment>
                )}
              </li>
              <li>
                {company && (
                  <Fragment>
                    <strong>Company : </strong>
                    {company}
                  </Fragment>
                )}
              </li>
              <li>
                {blog && (
                  <Fragment>
                    <strong>Website : </strong>
                    <a
                      href={blog.startsWith('http') ? blog : 'http://' + blog}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {blog.startsWith('http') ? blog : 'http://' + blog}
                    </a>
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className='card text-center'>
          <div className='badge badge-primary'>Followers : {followers}</div>
          <div className='badge badge-success'>Following : {following}</div>
          <div className='badge badge-light'>Public Repos : {public_repos}</div>
          <div className='badge badge-dark'>Public Gists : {public_gists}</div>
        </div>
      </Fragment>
    );
  }
}

export default User;
