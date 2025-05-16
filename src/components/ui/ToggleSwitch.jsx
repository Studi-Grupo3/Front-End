import React from 'react';

export function ToggleSwitch({ checked, onChange }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div
        className={`
          w-11 h-6 bg-gray-200
          peer-focus:outline-none rounded-full
          peer peer-checked:bg-[#3970B7]
          after:content-[''] after:absolute after:top-0.5 after:left-[2px]
          after:bg-white after:border after:rounded-full
          after:h-5 after:w-5 after:transition-all
          peer-checked:after:translate-x-full
          peer-checked:after:border-white
        `}
      />
    </label>
  );
}
