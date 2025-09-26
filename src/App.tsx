import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AuthLayout from './components/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Programs from './pages/Programs';
import Materials from './pages/Materials';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import Students from './pages/Students';
import Lessons from './pages/Lessons';
import Messages from './pages/Messages';
import UserManagement from './pages/admin/UserManagement';
import PlatformStats from './pages/admin/PlatformStats';
import { authService } from './utils/auth';

function App() {
  const user = authService.getCurrentUser();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={user?.role === 'mentor' ? <Students /> : <Navigate to="/dashboard" />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/lessons" element={user?.role === 'mentor' ? <Lessons /> : <Navigate to="/dashboard" />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/users" element={user?.role === 'super_admin' ? <UserManagement /> : <Navigate to="/dashboard" />} />
          <Route path="/admin/stats" element={user?.role === 'super_admin' ? <PlatformStats /> : <Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;