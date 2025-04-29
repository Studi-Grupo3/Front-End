export function StatCard({ title, subtitle, percentage, percentageColor, icon }) {
    return (
      <div className="bg-white rounded-xl shadow-sm px-5 py-4 flex items-center justify-between w-full">
        <div>
          <p className="text-sm text-gray-500">{subtitle}</p>
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          {percentage && (
            <p className={`text-sm mt-1 ${percentageColor ?? 'text-gray-500'}`}>
              {percentage}
            </p>
          )}
        </div>
        <div className="bg-indigo-50 p-2 rounded-full">
          {icon}
        </div>
      </div>
    );
  }
  