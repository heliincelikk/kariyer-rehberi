import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Register from './pages/Register';
import Explore from './pages/Explore';
import DashboardAday from './pages/DashboardAday';
import DashboardMentor from './pages/DashboardMentor';
import DashboardOgrenci from './pages/DashboardOgrenci';

function MainLayout() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  if (isDashboard) {
    return (
      <Routes>
        <Route path="/dashboard-aday" element={<DashboardAday />} />
        <Route path="/dashboard-mentor" element={<DashboardMentor />} />
        <Route path="/dashboard-ogrenci" element={<DashboardOgrenci />} />
      </Routes>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar onOpenLoginModal={() => setIsLoginOpen(true)} />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} />} />
          <Route path="/register" element={<Register setIsLoginOpen={setIsLoginOpen} />} />
          <Route path="/kesfet" element={<Explore />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

