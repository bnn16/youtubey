import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navigation from './components/Navigation';
import { AuthProvider, ProtectedRoute } from './utils/AuthProvider';
import NoMatch from './pages/NoMatch';
import Admin from './pages/Admin';
import TestRoute from './pages/TestRoute';
import Register from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route
          path="testRoute"
          element={
            <ProtectedRoute>
              <TestRoute />
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
