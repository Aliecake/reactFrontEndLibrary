import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Nprogress from 'nprogress';
// import Router from 'next/router';

// progress loading bar
Nprogress.start();
Nprogress.done();

const Header = props => (
  <div className="header">
    <div className="bounds">
      <Link to="/">
        <h1 className="header--logo">Course Library</h1>
      </Link>

      <nav>
        {/* if user is in context, display */}
        {props.context.authenticatedUser ? (
          <Fragment>
            <span>
              Welcome {props.context.authenticatedUser.user.firstName}{' '}
              {props.context.authenticatedUser.user.lastName} !
            </span>
            <Link className="addCourse" to="/courses/create">
              Add Course
            </Link>
            <Link className="signout" to="/signout">
              Sign Out
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <span>Welcome, Guest</span>
            <Link className="signup" to="/signup">
              Sign up
            </Link>
            <Link className="signin" to="/signin">
              Sign in
            </Link>
          </Fragment>
        )}
      </nav>
    </div>
  </div>
);

export default Header;
