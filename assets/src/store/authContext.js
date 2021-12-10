import React, { useState } from 'react';

const AuthContext = React.createContext({
  username: null,
  token: null,
  loggedIn: false,
  login: (token) => {},
  logout: () => {}
});

export const AuthContextProvider = (props) => {
  const tokenKey = 'rgbToken';
  const usrName = 'rgbUser';
  const [username, setUsername] = useState(localStorage.getItem(usrName));
  const [token, setToken] = useState(localStorage.getItem(tokenKey));
  const loggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem(tokenKey, token);
  };

  const userNameHandler = (username) => {
    setUsername(username);
    localStorage.setItem(usrName, username);
  }

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(usrName);
  };

  const contextValue = {
    username: username,
    token: token,
    loggedIn: loggedIn,
    login: loginHandler,
    logout: logoutHandler,
    setUsername: userNameHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
