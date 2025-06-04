import React, { useEffect, useState } from 'react';
import { SaveButton } from './SaveButton';
import { adminSettingsService } from '../../../services/dashboard/adminSettingsService';

export function SecuritySettings() {
  const [security, setSecurity] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminSettingsService.get()
      .then(data => setSecurity(prev => ({ ...prev, email: data.email || '' })))
      .catch(err => console.error('Erro ao carregar segurança:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (field, value) =>
    setSecurity(prev => ({ ...prev, [field]: value }));

  const salvar = async () => {

    if (security.newPassword !== security.confirmPassword) {
      return alert('Nova senha e confirmação não conferem.');
    }
    try {
      // 2) confirmamos a senha antiga
      await adminSettingsService.confirmPassword({
        currentPassword: security.currentPassword
      });

      // 3) enviamos PATCH com ambas as senhas para atualização efetiva
      await adminSettingsService.patch({
        currentPassword: security.currentPassword,
        newPassword: security.newPassword,
        confirmPassword: security.confirmPassword
      });

      alert('Senha alterada com sucesso!');
      // limpamos campos de senha
      setSecurity(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    } catch (err) {
      console.error('Erro ao atualizar segurança:', err);
      alert(err.message || 'Falha ao alterar senha.');
    }
  };

  if (loading) return <p>Carregando…</p>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold text-[#1A1A1A] mb-1">Segurança</h2>
      <p className="text-sm text-gray-600 mb-6">
        Gerencie as configurações de segurança da sua conta.
      </p>

      <div className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="E-mail"
            value={security.email}
            readOnly
            className="w-full p-2 border border-gray-200 rounded bg-gray-50 text-sm"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Senha Atual"
            value={security.currentPassword}
            onChange={e => handleChange('currentPassword', e.target.value)}
            className="w-full p-2 border border-gray-200 rounded bg-gray-50 text-sm"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Nova Senha"
            value={security.newPassword}
            onChange={e => handleChange('newPassword', e.target.value)}
            className="w-full p-2 border border-gray-200 rounded bg-gray-50 text-sm"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirmar Nova Senha"
            value={security.confirmPassword}
            onChange={e => handleChange('confirmPassword', e.target.value)}
            className="w-full p-2 border border-gray-200 rounded bg-gray-50 text-sm"
          />
        </div>
      </div>

      <div className="flex justify-center md:justify-end mt-8">
        <SaveButton onClick={salvar} label="Salvar Alterações" />
      </div>
    </div>
  );
}
