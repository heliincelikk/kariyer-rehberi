import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Register from './pages/Register';
import Explore from './pages/Explore';
import DashboardAday from './pages/DashboardAday';
import DashboardMentor from './pages/DashboardMentor';
import DashboardOgrenci from './pages/DashboardOgrenci';

export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <AuthProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar onOpenLoginModal={() => setIsLoginOpen(true)} />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} />} />
            <Route path="/register" element={<Register setIsLoginOpen={setIsLoginOpen} />} />
            <Route path="/kesfet" element={<Explore />} />
            <Route path="/dashboard-aday" element={<DashboardAday />} />
            <Route path="/dashboard-mentor" element={<DashboardMentor />} />
            <Route path="/dashboard-ogrenci" element={<DashboardOgrenci />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}
