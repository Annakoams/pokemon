import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import AuthenticationService from '../src/services/authentification-service';

const PrivateRoute: React.FC = () => {
  const isAuthenticated = AuthenticationService.isAuthenticated;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;