import React from 'react';
import clsx from 'clsx';

export function Button({
  children,
  onClick,
  variant = 'default', // default | ghost | destructive | primary
  size = 'md',         // sm | md
  disabled = false
}) {
  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition cursor-pointer';
  const sizes = {
    sm: 'px-2.5 py-1.5 text-sm',
    md: 'px-4 py-2 text-base'
  };
  const variants = {
    default:     'bg-indigo-600 text-white hover:bg-indigo-700',
    ghost:       'bg-transparent hover:bg-gray-100 text-gray-700',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
    primary:     'bg-[#3970B7] text-white hover:bg-[#315F9F]'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        base,
        sizes[size],
        variants[variant],
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      {children}
    </button>
  );
}
