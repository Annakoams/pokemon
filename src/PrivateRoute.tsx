import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AuthenticationService from '../src/services/authentification-service';




// Composant simple de test
const TestComponent = () => (
  <div>
    <h1>Test Component</h1>
    <p>Ce composant est rendu par PrivateRoute.</p>
  </div>
);

const PrivateRoute: React.FC<{ element: React.ReactNode }> = ({ element, ...rest }) => {
  const isAuthenticated = AuthenticationService.isAuthenticated;
  console.log('IsAuthenticated:', isAuthenticated);
  console.log('Element:', element);



  
  return (
    <Routes>
    <Route
      {...rest}
      element={isAuthenticated ? (
        <TestComponent/>
      ) : (
        <Navigate to="login" replace  />
      )}
    />
    </Routes>
  );
};

export default PrivateRoute;
