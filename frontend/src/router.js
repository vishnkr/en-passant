import SignUp from './components/auth/SignUp';
import Landing from './components/landing/Landing';
import Login from './components/auth/Login';
import React from 'react';

  const routes = [
    {
      path: "/",
      exact: true,
      main: () => <Landing />
    },
    {
      path: "/auth/signup",
      exact: true,
      main: () => <SignUp />
    },
    {
      path: "/auth/login",
      exact: true,
      main: () => <Login />
    }
  ];



export default routes;