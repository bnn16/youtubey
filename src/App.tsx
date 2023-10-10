import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import { AuthProvider, ProtectedRoute } from './utils/AuthProvider';
import NoMatch from './pages/NoMatch';
import Admin from './pages/Admin';
import TestRoute from './pages/TestRoute';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="testRoute" element={<TestRoute />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NoMatch message="404 Not Found!" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
