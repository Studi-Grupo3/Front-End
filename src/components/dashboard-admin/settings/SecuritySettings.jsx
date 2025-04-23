import React, { useState } from 'react';
import { SaveButton } from './SaveButton';

export function SecuritySettings() {
    const [security, setSecurity] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        twoFactor: false
    });

    const handleChange = (field, value) => {
        setSecurity(prev => ({ ...prev, [field]: value }));
    };

    const salvar = () => {
        console.log('Configurações de segurança:', security);
    };

    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-1">Segurança</h2>
            <p className="text-sm text-gray-600 mb-6">
                Gerencie as configurações de segurança da sua conta.
            </p>

            <div className="space-y-4">
                <div>
                    <input
                        type="password"
                        placeholder="Senha Atual"
                        value={security.currentPassword}
                        onChange={(e) => handleChange('currentPassword', e.target.value)}
                        className="w-full p-2 border border-gray-200 rounded bg-gray-50 text-sm"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Nova Senha"
                        value={security.newPassword}
                        onChange={(e) => handleChange('newPassword', e.target.value)}
                        className="w-full p-2 border border-gray-200 rounded bg-gray-50 text-sm"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Confirmar Nova Senha"
                        value={security.confirmPassword}
                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                        className="w-full p-2 border border-gray-200 rounded bg-gray-50 text-sm"
                    />
                </div>

                {/* Toggle autenticação 2FA */}
                <div className="flex items-center justify-between mt-4">
                    <label className="text-sm text-gray-700">Ativar autenticação de dois fatores</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={security.twoFactor}
                            onChange={() => handleChange('twoFactor', !security.twoFactor)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-[#3970B7]
              after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white 
              after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full 
              peer-checked:after:border-white">
                        </div>
                    </label>
                </div>

                {/* Sessões Ativas */}
                <div className="mt-8">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Sessões Ativas</h3>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-gray-50 border border-gray-200 p-3 rounded">
                            <div>
                                <p className="text-sm font-medium text-gray-800">Windows - Chrome</p>
                                <p className="text-xs text-gray-500">São Paulo, Brasil (Atual)</p>
                            </div>
                            <button className="text-sm text-[#3970B7] hover:underline cursor-pointer">Encerrar</button>
                        </div>

                        <div className="flex justify-between items-center bg-gray-50 border border-gray-200 p-3 rounded">
                            <div>
                                <p className="text-sm font-medium text-gray-800">Android - App</p>
                                <p className="text-xs text-gray-500">São Paulo, Brasil</p>
                            </div>
                            <button className="text-sm text-[#3970B7] hover:underline cursor-pointer">Encerrar</button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center md:justify-end mt-8">
                    <SaveButton onClick={salvar} label="Salvar Alterações" />
                </div>

            </div>
        </div>
    );
}
