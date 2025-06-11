import { GraduationCap, Lock, MoveDown, Save, Upload, User } from "lucide-react";
import { useState } from "react";
import ActionButtons from "./ActionButtons";

export default function ContentStudentRegistration({ current }) {

    switch (current) {
        case "Dados do Aluno":
            return (
                <form className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {[
                        { label: "Nome Completo do Aluno", type: "text", placeholder: "Nome completo" },
                        { label: "Email do Aluno (opcional)", type: "email", placeholder: "seu.email@exemplo.com" },
                        { label: "Data de Nascimento", type: "date", placeholder: "dd/mm/aaaa" },
                        { label: "Série/Ano", type: "select", options: ["1ºEF", "2ºEF", "3ºEF", "4ºEF", "5ºEF", "6ºEF", "7ºEF", "8ºEF", "9ºEF", "1ºEM", "2ºEM", "3ºEM"] },
                        { label: "Telefone do Aluno (opcional)", type: "number", placeholder: "(00) 00000-0000" },
                        { label: "Escola", type: "text", placeholder: "Nome da Escola" },
                    ].map(({ label, type, placeholder = "", options = [] }) => (
                        <div key={label} className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor={label}>
                                {label}
                            </label>

                            {type === "select" ? (
                                <select
                                    id={label}
                                    className="p-2 border border-gray-300 rounded-md"
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Selecione
                                    </option>
                                    {options.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    id={label}
                                    type={type}
                                    placeholder={placeholder}
                                    className="p-2 border border-gray-300 rounded-md"
                                />
                            )}
                        </div>
                    ))}


                    {/* Botões de ação também em largura total */}
                    <div className="md:col-span-2">
                        <ActionButtons />
                    </div>
                </form>

            );

        case "Responsavel":
            return (
                <form className="space-y-4">
                    {/* Campos de entrada */}
                    <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-3 rounded mb-6 flex items-start gap-2">
                        <MoveDown className="w-10 h-8" />
                        <div>
                            <p className="text-sm font-semibold">Dados do responsável</p>
                            <p className="text-xs">Preencha as informações do responsável para contato e gerenciamento da conta</p>
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 md:gap-8 mb-4">
                        {[
                            { label: "Nome Completo do Responsável", type: "text", placeholder: "Nome completo do responsável" },
                            { label: "Grau de Parentesco", type: "text", placeholder: "Grau de parentesco" },
                            { label: "CPF do Responsável", type: "text", placeholder: "000.000.000-00" },
                            { label: "Telefone do Aluno (opcional)", type: "number", placeholder: "(00) 00000-0000" },
                            { label: "Email do Aluno (opcional)", type: "email", placeholder: "seu.email@exemplo.com" },
                        ].map(({ label, type, placeholder = "" }, index, array) => (
                            <div
                                key={label}
                                className={`flex flex-col ${index === array.length - 1 ? "sm:col-span-2" : ""}`}
                            >
                                <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor={label}>
                                    {label}
                                </label>
                                <input
                                    id={label}
                                    type={type}
                                    placeholder={placeholder}
                                    className="p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Botões */}
                    <ActionButtons />

                </form>
            );
        case "Foto do Aluno":
            return (
                <div className="space-y-4">
                    <div className="flex flex-col items-center text-center gap-4 mt-12 mb-10">
                        <div className="w-45 h-45 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                            <User className="w-25 h-25 text-gray-400" />
                        </div>

                        <h2 className="text-xl font-semibold">Foto do Aluno</h2>   

                        <p className="text-sm text-gray-600">Adicione uma foto do aluno para personalizar o perfil. <br />Arquivos JPG, PNG com no máximo 5MB.</p>

                        <button className="bg-[#3970B7] text-sm text-white font-semibold px-3 py-4 rounded hover:bg-blue-700 flex items-center gap-2">
                            <Upload className="w-5 h-5" />
                            Selecionar Foto
                        </button>
                    </div>

                    <ActionButtons />

                </div>
            );
        case "Seguranca":
            return (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-2">Segurança da Conta</h2>
                    <p className="text-gray-600 mb-4">Atualize sua senha para proteger sua conta</p>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="nova-senha">
                            Nova Senha
                        </label>
                        <input
                            type="password"
                            id="nova-senha"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Digite a nova senha"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirmar-senha">
                            Confirmar Nova Senha
                        </label>
                        <input
                            type="password"
                            id="confirmar-senha"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Confirme a nova senha"
                        />
                    </div>

                    <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-3 rounded mb-6 flex items-start gap-2">
                        <Lock className="w-10 h-5" />
                        <div>
                            <p className="text-sm font-semibold">Mantenha sua conta segura</p>
                            <p className="text-xs">Use uma senha forte com pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.</p>
                        </div>
                    </div>

                    <ActionButtons />

                </div>
            );
    }
}
