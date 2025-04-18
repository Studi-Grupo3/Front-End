import React, { useState } from 'react';
import { GeneralSettings } from './GeneralSettings';
import { NotificationSettings } from './NotificationSettings';
import { SecuritySettings } from './SecuritySettings';

const tabs = [
    { key: 'geral', label: 'Geral' },
    { key: 'notificacoes', label: 'Notificações' },
    { key: 'seguranca', label: 'Segurança' }
];

export function Tabs() {
    const [activeTab, setActiveTab] = useState('geral');

    return (
        <div>
            <div className="flex gap-4 mt-3 mx-6">
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`cursor-pointer px-4 py-2 border-b-2 transition-all duration-200 ${
                            activeTab === tab.key
                                ? 'border-blue-600 font-bold text-black'
                                : 'border-transparent text-gray-500 hover:border-gray-300'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="mt-3 m-6 bg-white rounded shadow">
                {activeTab === 'geral' && <GeneralSettings />}
                {activeTab === 'notificacoes' && <NotificationSettings />}
                {activeTab === 'seguranca' && <SecuritySettings />}
            </div>
        </div>
    );
}
