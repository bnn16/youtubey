import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../utils/AuthProvider';

const Navigation = () => {
  const { token, onLogout } = useAuth();

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      {!token && <NavLink to="/login">Login</NavLink>}

      {token && (
        <>
          <NavLink to="/admin">Admin</NavLink>
          <NavLink to="/testRoute">Test Route</NavLink>
          <button type="button" onClick={onLogout}>
            Sign Out
          </button>
        </>
      )}
    </nav>
  );
};

export default Navigation;
