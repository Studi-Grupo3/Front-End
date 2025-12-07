import React from 'react';
import { translateSubject } from '../../utils/tradutionUtils';

export function SubjectBadge({ subjects }) {
    // Handle stringified arrays like "[CHEMISTRY, PHYSICS, BIOL"
    let normalizedSubjects = subjects;

    if (typeof subjects === 'string') {
        if (subjects.startsWith('[')) {
            // It's a stringified array, try to parse it
            try {
                const cleaned = subjects.replace(/^\[|\]$/g, '').trim();
                normalizedSubjects = cleaned.split(',').map(s => s.trim()).filter(s => s);
            } catch (e) {
                console.error('Error parsing subjects:', e);
                normalizedSubjects = [subjects];
            }
        } else if (subjects.includes(',')) {
            // It's a simple comma-separated string
            normalizedSubjects = subjects.split(',').map(s => s.trim()).filter(s => s);
        }
    }

    // Normalize to array
    const list = Array.isArray(normalizedSubjects) ? normalizedSubjects : [normalizedSubjects];
    // Filter empty
    const validList = list.filter(s => s && typeof s === 'string');

    if (validList.length === 0) return <span className="text-gray-400">-</span>;

    const first = validList[0];
    const others = validList.slice(1);

    return (
        <div className="inline-flex items-center justify-center gap-1.5">
            <span title={translateSubject(first)}>
                {translateSubject(first)}
            </span>
            {others.length > 0 && (
                <div className="relative group flex-shrink-0">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-1.5 py-0.5 rounded cursor-help flex items-center justify-center min-w-[24px]">
                        +{others.length}
                    </span>
                    <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-max bg-gray-900 text-white text-xs rounded py-2 px-3 z-50 shadow-xl">
                        <div className="flex flex-col gap-1">
                            {others.map((subj, idx) => (
                                <span key={idx} className="whitespace-nowrap">
                                    {translateSubject(subj)}
                                </span>
                            ))}
                        </div>
                        {/* Arrow */}
                        <div className="absolute left-3 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                    </div>
                </div>
            )}
        </div>
    );
}
