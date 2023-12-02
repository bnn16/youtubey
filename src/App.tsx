import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider, ProtectedRoute } from './utils/AuthProvider';
import NoMatch from './pages/NoMatch';
import Admin from './pages/Admin';
import TestRoute from './pages/TestRoute';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Profile from './pages/Profile/Profile';
import Post from './pages/Posts/Post';
import WelcomePage from './pages/Welcome/WelcomePage';
import DashBoard from './pages/Dashboard/Dashboard';
import EditorPosts from './pages/Dashboard/EditorView/EditorPosts';
import Chat from './pages/Chat/Chat';
import socketIO from 'socket.io-client';

function App() {
  const socket = socketIO('http://localhost:4000');
  return (
    <AuthProvider>
      <Routes>
        <Route index element={<WelcomePage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="testRoute" element={<TestRoute />} />
        <Route path="/posts/editorView/:id" element={<EditorPosts />} />
        <Route
          path="posts/:id"
          element={
            <ProtectedRoute>
              <Post />
            </ProtectedRoute>
          }
        />
        <Route
          path="chat"
          element={
            <ProtectedRoute>
              <Chat socket={socket} />
            </ProtectedRoute>
          }
        />
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
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NoMatch message="404 Not Found!" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
