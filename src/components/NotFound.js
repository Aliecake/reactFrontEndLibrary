import React from 'react';

const NotFound = props =>
  props.noCourse ? (
    <div className="bounds">
      <h1>That course doesn't exist</h1>
      <a href="/">Go Home</a>
    </div>
  ) : (
    <div className="bounds">
      <h1>Sorry! We couldn't find what you're looking for!</h1>
      <a href="/">Go Home</a>
    </div>
  );

export default NotFound;
