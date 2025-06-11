import React from "react";

export default function InfoCard({ title, value, icon, subtitle }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm text-gray-500">{title}</span>
        {icon}
      </div>
      <div className="text-xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-[#3970B7] mt-1">{subtitle}</div>
    </div>
  );
}
