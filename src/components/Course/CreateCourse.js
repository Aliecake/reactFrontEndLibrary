import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form';

export default class CreateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: [],
  };

  render() {
    const {
      title,
      description,
      errors,
      estimatedTime,
      materialsNeeded,
    } = this.state;

    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Create Course"
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
                      value={title}
                      onChange={this.change}
                      placeholder="Course Title..."
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
                    value={description}
                    onChange={this.change}
                    placeholder="Course Description..."
                  />
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <input
                        id="estimatedTime"
                        name="estimatedTime"
                        className="course--time--input"
                        type="text"
                        value={estimatedTime}
                        onChange={this.change}
                        placeholder="Hours"
                      />
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <textarea
                        id="materialsNeeded"
                        name="materialsNeeded"
                        type="text"
                        className=""
                        value={materialsNeeded}
                        onChange={this.change}
                        placeholder="Materials Needed..."
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
          Only members can add courses... <Link to="/signin">Click here</Link>{' '}
          to sign in or <Link to="/signup">Sign up</Link>
        </p>
      </div>
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
    const { title, description, materialsNeeded, estimatedTime } = this.state;

    // user payload
    const course = {
      title,
      description,
      materialsNeeded,
      estimatedTime,
    };

    context.data
      .createCourse(course)
      .then(errors => {
        if (errors) {
            this.setState({ errors });
        } else {
          this.props.history.push('/');
        }
      })
      .catch(err => {
        console.log(err)
        this.props.history.push('/error')
      });
  };

  cancel = () => {
    this.props.history.push(`/`);
  };
}
