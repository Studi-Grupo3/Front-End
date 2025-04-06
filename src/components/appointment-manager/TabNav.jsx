// src/components/TabNav.jsx
import React from 'react';

export const TabNav = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`py-2 px-1 font-medium text-sm border-b-2 -mb-px transition-colors ${
              activeTab === tab.id
                ? 'border-studi-blue text-studi-blue'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

