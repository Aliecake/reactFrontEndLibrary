import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './styles/App.css';
import Header from './components/Header';
import Intro from './components/Intro';
import Courses from './components/Course/Courses';
import CourseDetail from './components/Course/CourseDetail';
import NotFound from './components/NotFound';
import withContext from './Context';
import UserSignUp from './components/User/UserSignUp';
import UserSignIn from './components/User/UserSignIn';
import UserSignOut from './components/User/UserSignOut';
import CreateCourse from './components/Course/CreateCourse';
import UpdateCourse from './components/Course/UpdateCourse';
import PrivateRoute from './components/PrivateRoute';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';

const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

export default () => (
  <Router>
    <div>
      <HeaderWithContext />
      <Intro />
      <Switch>
        <Route exact path="/" component={CoursesWithContext} />

        <PrivateRoute
          exact
          path="/courses/create"
          component={CreateCourseWithContext}
        />
        <Route exact path="/courses/:id" component={CourseDetailWithContext} />
        <PrivateRoute
          exact
          path="/courses/:id/update"
          component={UpdateCourseWithContext}
        />

        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />

        <Route path="/forbidden" component={Forbidden} />
        <Route path="/error" component={UnhandledError} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  </Router>
);
