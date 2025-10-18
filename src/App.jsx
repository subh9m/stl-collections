import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.theme === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  
  // 1. Defines the new state
  const [activeView, setActiveView] = useState('cpp'); // 'cpp' or 'java'

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      root.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDarkMode]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // 2. Defines the new function
  const toggleView = () => {
    setActiveView(activeView === 'cpp' ? 'java' : 'cpp');
  };

  return (
    <div className="relative min-h-screen">
      {/* 3. Passes the new props to Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        activeView={activeView}
        toggleView={toggleView}
      />
      
      {/* 4. Passes the new prop to MainContent */}
      <MainContent 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        activeView={activeView}
      />
    </div>
  );
}