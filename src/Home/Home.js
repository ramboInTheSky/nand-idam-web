import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  componentWillMount() {
    const { isAuthenticated } = this.props.auth;
    this.setState({ profile: {} });
    if (isAuthenticated()) {
      const { userProfile, getProfile } = this.props.auth;
      if (!userProfile) {
        getProfile((err, profile) => {
          this.setState({ profile });
        });
      } else {
        this.setState({ profile: userProfile });
      }
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { profile } = this.state;

    return (
      <div className="container">
        {
          isAuthenticated() && !!profile && (
            <div className="container">
              <div className="profile-area">
                <h1>{profile.name}</h1>
                <img src={profile.picture} alt="profile" />
                <div>
                  <h3>{profile.nickname}</h3>
                </div>
                <pre>{JSON.stringify(profile, null, 2)}</pre>
              </div>
            </div>
          )
        }
        {
          !isAuthenticated() && (
            <h4>
              You are not logged in! Please{' '}
              <Link
                to={'/login'}
              >
                Log In
              </Link>
              {' '}to continue.
            </h4>
          )
        }
      </div>
    );
  }
}

Home.defaultProps = {
  auth: {},
};

Home.propTypes = {
  auth: PropTypes.obj,
};

export default Home;
