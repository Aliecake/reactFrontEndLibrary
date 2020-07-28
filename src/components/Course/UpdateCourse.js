import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ls from 'local-storage';
import Form from '../Form';

export default class UpdateCourse extends Component {
  state = {
    id: '',
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    addedBy: '',
    errors: [],
    redirect: false,
  };

  // by using local storage, an error will not happen if a user self directs to /update via URL bar and setting state with props.location.state
  componentWillMount() {
    // get the course, if it doesnt return set state for redirect
    const storedCourse = ls.get(this.props.match.params.id);

    if (!storedCourse) {
      this.setState({
        redirect: true,
      });
    } else {
      const parsedCourse = JSON.parse(storedCourse);
      const creatorID = parsedCourse.addedBy.id;

      this.setState({
        id: parsedCourse.id,
        title: parsedCourse.title,
        description: parsedCourse.description,
        estimatedTime: parsedCourse.estimatedTime,
        materialsNeeded: parsedCourse.materialsNeeded,
        addedBy: creatorID,
      });
    }
  }

  render() {
    const { errors } = this.state;

    // redirect if no course exists
    if (this.state.redirect) {
      return <Redirect to="/notfound" />;
    }

    return (
      <Fragment>
        {/* if state exists, load the form. If not forward to not found */}
        {this.props.location.state &&
        this.props.context.authenticatedUser.user.id === this.state.addedBy ? (
          <div className="bounds course--detail">
            <h1>Update Course</h1>
            <Form
              cancel={this.cancel}
              errors={errors}
              submit={this.submit}
              submitButtonText="Update Course"
              elements={() => (
                <Fragment>
                  <div className="grid-66">
                    <div className="course--header">
                      <h4 className="course--label">Course</h4>
                      <div>
                        <input
                          className="input-title course--title--input"
                          id="title"
                          name="title"
                          type="text"
                          value={this.state.title}
                          onChange={this.change}
                        />
                      </div>
                      <p>By username</p>
                    </div>
                    <div className="course--description">
                      <textarea
                        id="description"
                        name="description"
                        type="text"
                        className=""
                        value={this.state.description}
                        onChange={this.change}
                      />
                    </div>
                  </div>
                  <div className="grid-25 grid-right">
                    <div className="course--stats">
                      <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                          {/* OR statement on time & materials allows there to be some prompt in the inputs */}
                          <h4>Estimated Time</h4>
                          <input
                            id="estimatedTime"
                            name="estimatedTime"
                            className="course--time--input"
                            type="text"
                            value={this.state.estimatedTime}
                            onChange={this.change}
                          />
                        </li>
                        <li className="course--stats--list--item">
                          <h4>Materials Needed</h4>
                          <textarea
                            id="materialsNeeded"
                            name="materialsNeeded"
                            type="text"
                            className=""
                            value={this.state.materialsNeeded}
                            onChange={this.change}
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </Fragment>
              )}
            />
            <p>&nbsp;</p>
            <p>
              Only members can add courses...{' '}
              <Link to="/signin">Click here</Link> to sign in or{' '}
              <Link to="/signup">Sign up</Link>
            </p>
          </div>
        ) : (
          // further logic for auth user vs not found
          <Redirect to="/forbidden" />
        )}
      </Fragment>
    );
  }

  change = e => {
    const { name } = e.target;
    const { value } = e.target;

    this.setState(() => ({
      [name]: value,
    }));
  };

  submit = () => {
    const { context } = this.props;
    const {
      id,
      title,
      description,
      materialsNeeded,
      estimatedTime,
    } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    // user payload
    const course = {
      id,
      title,
      description,
      materialsNeeded,
      estimatedTime,
    };

    context.data
      .updateCourse(course)
      .then(errors => {
        if (errors) {
          this.setState({
            errors,
          });
          console.log(this.state.errors);
        } else {
          this.props.history.push(from);
        }
      })
      .catch(err => {
        console.log(`catch block in update`, err);
        this.props.history.push('/error')
      });
  };

  cancel = () => {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    this.props.history.push(from);
  };
}
