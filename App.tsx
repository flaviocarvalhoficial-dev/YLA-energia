
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Login from './pages/Login.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Statistics from './pages/Statistics.tsx';
import FleetPanel from './pages/FleetPanel.tsx';
import Alerts from './pages/Alerts.tsx';
import Profile from './pages/Profile.tsx';
import SystemDetail from './pages/SystemDetail.tsx';
import ActivityDetail from './pages/ActivityDetail.tsx';
import Consumption from './pages/Consumption.tsx';
import BottomNav from './components/BottomNav.tsx';
import QuickActionsModal from './components/QuickActionsModal.tsx';
import Onboarding from './components/Onboarding.tsx';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('yla_onboarding_seen');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('yla_onboarding_seen', 'true');
    setShowOnboarding(false);
  };

  return (
    <HashRouter>
      <div className="max-w-md mx-auto min-h-[100dvh] bg-background-light relative shadow-2xl overflow-x-hidden text-text-main font-sans antialiased">
        <AnimatePresence mode="wait">
          {isAuthenticated && showOnboarding ? (
            <Onboarding key="onboarding" onComplete={handleOnboardingComplete} />
          ) : (
            <Routes key="routes">
              <Route 
                path="/login" 
                element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} 
              />
              <Route 
                path="/" 
                element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/statistics" 
                element={isAuthenticated ? <Statistics /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/consumption" 
                element={isAuthenticated ? <Consumption /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/system-detail" 
                element={isAuthenticated ? <SystemDetail /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/activity/:id" 
                element={isAuthenticated ? <ActivityDetail /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/fleet" 
                element={isAuthenticated ? <FleetPanel /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/alerts" 
                element={isAuthenticated ? <Alerts /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/profile" 
                element={isAuthenticated ? <Profile onLogout={() => setIsAuthenticated(false)} /> : <Navigate to="/login" />} 
              />
            </Routes>
          )}
        </AnimatePresence>

        {isAuthenticated && !showOnboarding && (
          <>
            <BottomNav onPlusClick={() => setIsQuickActionsOpen(true)} />
            <QuickActionsModal 
              isOpen={isQuickActionsOpen} 
              onClose={() => setIsQuickActionsOpen(false)} 
            />
          </>
        )}
      </div>
    </HashRouter>
  );
};

export default App;
