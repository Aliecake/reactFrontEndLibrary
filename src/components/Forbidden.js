import React from 'react';
import { Link } from 'react-router-dom';

const Forbidden = () => (
  <div className="bounds">
    <h1>
      You are not authorized to do this. Only content creator can modify this
      item. If you created this, and are not currently logged in{' '}
      <Link to="/signin">Sign in</Link>
    </h1>
    <a href="/">Go Home</a>
  </div>
);

export default Forbidden;
