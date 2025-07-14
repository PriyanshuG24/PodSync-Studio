import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import DashboardLayout from './components/Layout/DashboardLayout';

// Import dashboard pages
import DashboardHome from './pages/dashboard/DashboardHome';
import Studio from './pages/dashboard/Studio';
import Projects from './pages/dashboard/Projects';
import Setting from './pages/dashboard/Setting';
import Profile from './pages/dashboard/Profile';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
      {!user && <Navbar />}
        <main>
          <Routes>
            <Route 
              path="/" 
              element={!user ? <Home /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/dashboard" />} 
            />            
            {/* Dashboard Routes */}
            <Route 
              path="/dashboard" 
              element={
                user ? (
                  <DashboardLayout />
                ) : (
                  <Navigate to="/login" />
                )
              }
            >
              <Route index element={<DashboardHome />} />
              <Route path="studio" element={<Studio />} />
              <Route path="projects" element={<Projects />} />
              <Route path="settings" element={<Setting />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;