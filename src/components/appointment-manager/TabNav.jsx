import React, { useState, useRef, useEffect } from 'react';
import { Menu } from 'lucide-react';

export const TabNav = ({ tabs, activeTab, onChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="border-b border-gray-200 relative">
      {/* Botão Hamburguer - visível até lg */}
      <button
        ref={buttonRef}
        className="lg:hidden p-2 flex items-center"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      {/* Tabs Desktop - visível só a partir de lg */}
      <nav className="hidden lg:flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`py-2 px-1 cursor-pointer font-medium text-sm border-b-2 -mb-px transition-colors ${
              activeTab === tab.id
                ? 'border-studi-blue text-studi-blue'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Menu Dropdown - visível até lg */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="lg:hidden absolute top-full left-0 w-[250%] bg-white z-50 shadow-md rounded-b-lg"
          style={{ maxHeight: '80vh', overflowY: 'auto' }}
        >
          <div className="flex flex-col">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  onChange(tab.id);
                  setMenuOpen(false);
                }}
                className={`py-3 px-4 text-left cursor-pointer font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
