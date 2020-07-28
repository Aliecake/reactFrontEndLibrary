import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form';

export default class UserSignIn extends Component {
  state = {
    errors: [],
  };

  render() {
    const { errors } = this.state;
    return (
      <Fragment>
        <div>
          <Form
            submitButtonText="Sign In"
            errors={errors}
            submit={this.submit}
            cancel={this.cancel}
            elements={() => (
              <Fragment>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  onChange={this.change}
                  placeholder="Email Address"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={this.change}
                  placeholder="Password"
                />
              </Fragment>
            )}
          />
        </div>
        <p>&nbsp;</p>
        <p>
          Dont have a user account? <Link to="/signup">Click here</Link> to sign
          up
        </p>
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
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { emailAddress, password } = this.state;

    context.actions.signIn(emailAddress, password).then(user => {
      if (user === null) {
        this.setState({
          errors: [
            {
              msg: 'Sign in unsuccessful',
            },
          ],
        });
      } else {
        this.props.history.push(from);
        console.log(`${emailAddress} signed in`);
      }
    });
  };

  cancel = () => {
    this.props.history.push('/');
  };
}
