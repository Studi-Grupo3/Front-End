import React from 'react';
import { FileDown, Mail } from 'lucide-react';

export const ReportCard = ({ title, description, onDownload, onEmail }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
      <h3 className="text-md font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-xs text-gray-500 mb-3">{description}</p>

      <div className="flex gap-2">
        <button
          onClick={onDownload}
          className="flex items-center cursor-pointer gap-1 px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-md hover:bg-gray-100 transition"
        >
          <FileDown className="w-4 h-4" />
          PDF
        </button>

        <button
          onClick={onEmail}
          className="flex items-center cursor-pointer gap-1 px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-md hover:bg-gray-100 transition"
        >
          <Mail className="w-4 h-4" />
          Email
        </button>
      </div>
    </div>
  );
};
