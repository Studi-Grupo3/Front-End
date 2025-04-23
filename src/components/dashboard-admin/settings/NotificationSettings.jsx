import React, { useState } from 'react';
import { SaveButton } from './SaveButton';

const defaultPrefs = {
    pagamentos: true,
    agendamentos: true,
    cancelamentos: false,
    semanal: false,
    mensal: true
};

const notificationLabels = {
    pagamentos: {
        title: 'Pagamentos Processados',
        desc: 'Notificações quando um pagamento for processado'
    },
    agendamentos: {
        title: 'Novos Agendamentos',
        desc: 'Notificações de novos agendamentos'
    },
    cancelamentos: {
        title: 'Cancelamentos',
        desc: 'Notificações de aulas canceladas'
    },
    semanal: {
        title: 'Relatórios Semanais',
        desc: 'Receba um resumo semanal por email'
    },
    mensal: {
        title: 'Relatórios Mensais',
        desc: 'Receba um resumo mensal por email'
    }
};

export function NotificationSettings() {
    const [notifications, setNotifications] = useState(defaultPrefs);

    const toggle = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const salvar = () => {
        console.log('Preferências salvas:', notifications);
    };

    return (
        <div className="p-6 bg-white rounded shadow">
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-1">Notificações</h2>
            <p className="text-sm text-gray-600 mb-6">
                Configure quais notificações você deseja receber.
            </p>

            <div className="space-y-6">
                {Object.entries(notifications).map(([key, value]) => {
                    const label = notificationLabels[key];
                    return (
                        <div key={key} className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-900">{label.title}</p>
                                <p className="text-xs text-gray-500">{label.desc}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={() => toggle(key)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full 
                    peer peer-checked:bg-[#3970B7]
                    after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
                    after:bg-white after:border after:rounded-full after:h-5 after:w-5 
                    after:transition-all peer-checked:after:translate-x-full 
                    peer-checked:after:border-white">
                                </div>
                            </label>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-center md:justify-end mt-8">
                <SaveButton onClick={salvar} label="Salvar Alterações" />
            </div>

        </div>
    );
}
