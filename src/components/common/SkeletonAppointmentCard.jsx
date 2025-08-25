// src/components/common/SkeletonAppointmentCard.jsx
export function SkeletonAppointmentCard() {
  return (
    <div className="p-4 bg-white rounded shadow animate-pulse flex flex-col gap-2">
      <div className="h-4 bg-gray-300 rounded w-3/4" />
      <div className="h-3 bg-gray-300 rounded w-1/2" />
      <div className="h-24 bg-gray-300 rounded" />
      <div className="mt-auto h-6 bg-gray-300 rounded w-1/3 self-end" />
    </div>
  );
}
