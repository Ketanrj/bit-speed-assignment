import React, { useEffect, useState } from 'react'
import { SunDimIcon, LucideMoon } from 'lucide-react';

function ThemeSwitch() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    // Set theme class on HTML element (for Tailwind or CSS variables)
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    // Optional: Read saved theme from localStorage
    const saved = localStorage.getItem('theme');
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle('dark', saved === 'dark');
    }
  }, []);

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button onClick={toggleTheme} className="cursor-pointer p-2 py-2 bg-gray-50 shadow-sm border border-gray-100 text-gray-700 rounded-full ">
      {theme === 'dark' ? <SunDimIcon size={20} /> : <LucideMoon size={20} />}
    </button>
  );
}

export default ThemeSwitch;
