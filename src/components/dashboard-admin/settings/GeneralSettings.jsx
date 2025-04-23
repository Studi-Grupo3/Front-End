import React, { useState } from 'react';
import { SaveButton } from './SaveButton';

export function GeneralSettings() {
    const [form, setForm] = useState({
        companyName: '',
        cnpj: '',
        email: '',
        phone: '',
        address: '',
        logo: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const salvar = () => {
        console.log('Dados da empresa:', form);
        // Enviar para backend aqui
    };

    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-900">Informações da Empresa</h2>
            <p className="text-sm text-gray-500 mb-6">Estas informações serão exibidas em relatórios e documentos.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm text-gray-700 mb-1">Nome da Empresa</label>
                    <input
                        name="companyName"
                        value={form.companyName}
                        onChange={handleChange}
                        placeholder="LessonPay Educação Ltda."
                        className="w-full p-2 border border-gray-200 rounded bg-gray-50 text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-700 mb-1">CNPJ</label>
                    <input
                        name="cnpj"
                        value={form.cnpj}
                        onChange={handleChange}
                        placeholder="12.345.678/0001-90"
                        className="w-full p-2 border border-gray-200 rounded bg-gray-50 text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-700 mb-1">Email de Contato</label>
                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="contato@lessonpay.com.br"
                        className="w-full p-2 border border-gray-200 rounded bg-gray-50 text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-700 mb-1">Telefone</label>
                    <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="(11) 3456-7890"
                        className="w-full p-2 border border-gray-200 rounded bg-gray-50 text-sm"
                    />
                </div>
            </div>

            <div className="mt-6">
                <label className="block text-sm text-gray-700 mb-1">Endereço</label>
                <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Av. Paulista, 1000, São Paulo, SP"
                    className="w-full p-2 border border-gray-200 rounded bg-gray-50 text-sm"
                />
            </div>

            <div className="mt-6">
                <label className="block text-sm text-gray-700 mb-1">Logo da Empresa</label>
                <label className="inline-block px-4 py-2 bg-white border border-gray-300 rounded shadow-sm cursor-pointer text-sm text-gray-600 hover:bg-gray-50 transition">
                    Escolher arquivo
                    <input
                        type="file"
                        name="logo"
                        onChange={handleChange}
                        className="hidden"
                    />
                </label>
                {form.logo && <span className="ml-2 text-sm text-gray-600">{form.logo.name}</span>}
            </div>

            <div className="flex justify-center md:justify-end mt-8">
                <SaveButton onClick={salvar} label="Salvar Alterações" />
            </div>
            
        </div>
    );
}
