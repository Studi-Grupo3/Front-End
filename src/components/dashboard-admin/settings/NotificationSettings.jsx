// src/components/dashboard-admin/settings/NotificationSettings.jsx
import React, { useEffect, useState } from 'react';
import { SaveButton } from './SaveButton';
import { adminSettingsService } from '../../../services/dashboard/adminSettingsService';

const labels = {
  notifyPayments:     'Pagamentos Processados',
  notifyAppointments: 'Novos Agendamentos',
  notifyCancellations:'Cancelamentos'
};

export function NotificationSettings() {
  // já inicializa com todas as flags em false
  const [notif, setNotif] = useState({
    notifyPayments: false,
    notifyAppointments: false,
    notifyCancellations: false
  });

  // carrega e preenche quando chegar
  useEffect(() => {
    adminSettingsService.get()
      .then(data => {
        setNotif({
          notifyPayments:     data.notifyPayments,
          notifyAppointments: data.notifyAppointments,
          notifyCancellations:data.notifyCancellations
        });
      })
      .catch(err => console.error('Erro ao carregar notificações:', err));
      // sem finally: mesmo que demore, a UI já está visível com os switches em false
  }, []);

  const toggle = key =>
    setNotif(prev => ({ ...prev, [key]: !prev[key] }));

  const salvar = async () => {
    try {
      await adminSettingsService.patch(notif);
      alert('Notificações salvas com sucesso!');
    } catch (err) {
      console.error('Erro ao salvar notificações:', err);
      alert('Erro ao salvar configurações.');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold text-[#1A1A1A] mb-1">Notificações</h2>
      <p className="text-sm text-gray-600 mb-6">
        Configure quais notificações você deseja receber.
      </p>

      <div className="space-y-6">
        {Object.entries(notif).map(([key, val]) => (
          <div key={key} className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-900">{labels[key]}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={val}
                onChange={() => toggle(key)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-[#3970B7]
                  after:content-[''] after:absolute after:top-0.5 after:left-[2px]
                  after:bg-white after:border after:rounded-full after:h-5 after:w-5
                  after:transition-all peer-checked:after:translate-x-full
                  peer-checked:after:border-white">
              </div>
            </label>
          </div>
        ))}
      </div>

      <div className="flex justify-center md:justify-end mt-8">
        <SaveButton onClick={salvar} label="Salvar Alterações" />
      </div>
    </div>
  );
}
