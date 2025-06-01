import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Attendance from './pages/Attendance';
import Grades from './pages/Grades';

function App() {
  const [currentPath, setCurrentPath] = useState('/');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Get current page title based on path
  const getPageTitle = () => {
    switch (currentPath) {
      case '/':
        return 'Dashboard';
      case '/students':
        return 'Students';
      case '/attendance':
        return 'Attendance';
      case '/grades':
        return 'Grades';
      case '/calendar':
        return 'Calendar';
      case '/settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };
  
  // Render current page content based on path
  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <Dashboard />;
      case '/students':
        return <Students />;
      case '/attendance':
        return <Attendance />;
      case '/grades':
        return <Grades />;
      case '/calendar':
      case '/settings':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-600">Under Construction</h2>
              <p className="mt-2 text-gray-500">This page is coming soon!</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - hidden on mobile unless toggled */}
      <div className={`
        fixed inset-y-0 left-0 z-20 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:shadow-none
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar 
          currentPath={currentPath} 
          onNavigate={(path) => {
            setCurrentPath(path);
            setIsMobileMenuOpen(false);
          }} 
        />
      </div>
      
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-10 bg-gray-600 bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getPageTitle()} onMenuClick={toggleMobileMenu} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;