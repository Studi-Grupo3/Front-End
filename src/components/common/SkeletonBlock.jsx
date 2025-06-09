// src/components/common/SkeletonBlock.jsx
export function SkeletonBlock({ width = '100%', height = '1rem', borderRadius = '0.25rem' }) {
  return (
    <div
      style={{ width, height, borderRadius }}
      className="bg-gray-300 animate-pulse"
    />
  );
}
