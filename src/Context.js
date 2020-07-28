import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

// create context
const Context = React.createContext();

// provider component
export class Provider extends Component {
  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser } = this.state;

    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };

    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);

    if (user !== null) {
      this.setState(() => ({
        authenticatedUser: user,
      }));
      Cookies.set('authenticatedUser', JSON.stringify(user), {
        expires: 1,
      });
      // not ideal, storing hashed password to cookies.
      Cookies.set('password', JSON.stringify(btoa(password)), {
        expires: 1,
      });
      return user;
    }
    return null;
  };

  signOut = () => {
    this.setState({
      authenticatedUser: null,
    });
    Cookies.remove('authenticatedUser');
    Cookies.remove('password');
  };
}

export const { Consumer } = Context;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
