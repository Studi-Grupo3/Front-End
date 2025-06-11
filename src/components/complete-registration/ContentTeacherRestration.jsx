import { EyeIcon, GraduationCap, Lock, Save, Upload, User } from "lucide-react";
import { useRef, useState } from "react";
import ActionButtons from "./ActionButtons";
import { EyeSlashIcon } from "@heroicons/react/24/outline";

export default function ContentTeacherRegistration({ current, formData, onChange, onSave }) {

    const [formacao, setFormacao] = useState("");
    const [experiencia, setExperiencia] = useState("");
    const [materias, setMaterias] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const fileInputRef = useRef(null);

    const abrirInput = () => {
        fileInputRef.current.click();
    };

    switch (current) {
        case "Informacoes Pessoais":
            return (
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={e => { e.preventDefault(); onSave(); }}>
                    {[
                        { label: "Nome Completo", type: "text", placeholder: "Nome completo", field: "name" },
                        { label: "Email", type: "email", placeholder: "seu.email@exemplo.com", field: "email" },
                        { label: "Telefone", type: "tel", placeholder: "(00) 00000-0000", field: "telefone" },
                        { label: "Data de Nascimento", type: "date", placeholder: "dd/mm/aaaa", field: "dataNascimento" },
                    ].map(({ label, type, placeholder = "", field }) => (
                        <div key={label} className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor={label}>
                                {label}
                            </label>
                            <input
                                id={field}
                                type={type}
                                placeholder={placeholder}
                                value={formData[field] || ""}
                                onChange={e => onChange(field, e.target.value)}
                                className="p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    ))}

                    <div className="md:col-span-2">
                        <label htmlFor="sobre" className="text-sm font-semibold text-gray-700 mb-1 block">
                            Sobre Você
                        </label>
                        <textarea
                            id="sobre"
                            placeholder="Descreva sua experiência, metodologia de ensino e áreas de especialização..."
                            value={formData.sobre || ""}
                            onChange={e => onChange("sobre", e.target.value)}
                            rows="4"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <ActionButtons onSave={onSave} />
                    </div>
                </form>

            );

        case "Qualificacoes":
            return (
                <form className="space-y-4">

                    <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Formação Acadêmica</label>
                            <select
                                onChange={(e) => setFormacao(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm cursor-pointer"
                                value={formData.formacao || ""}
                            >
                                <option value="">Selecione...</option>
                                <option value="graduacao">Graduação</option>
                                <option value="pos">Pós-graduação</option>
                                <option value="mestrado">Mestrado</option>
                                <option value="doutorado">Doutorado</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Anos de Experiência</label>
                            <select
                                value={formData.experiencia || ""}
                                onChange={(e) => setExperiencia(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm cursor-pointer"
                            >
                                <option value="">Selecione...</option>
                                <option value="1">1 ano</option>
                                <option value="2">2 anos</option>
                                <option value="3">3 anos</option>
                                <option value="4+">4 anos ou mais</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Matérias que Leciona</label>

                        <div
                            onClick={() => setShowModal(true)}
                            className="w-full min-h-[44px] border border-gray-300 rounded-md px-3 py-2 text-sm flex flex-wrap gap-2 cursor-pointer bg-white"
                        >
                            {materias.length === 0 && <span className="text-gray-400">Clique para selecionar...</span>}
                            {materias.map((mat, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs flex items-center gap-1"
                                >
                                    {mat}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setMaterias(materias.filter((m) => m !== mat));
                                        }}
                                        className="text-blue-600 hover:text-red-500"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {showModal && (
                        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-md">
                                <h2 className="text-lg font-semibold mb-4">Selecione as matérias</h2>
                                <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto mb-4">
                                    {[
                                        "Matemática", "Física", "Química", "Biologia", "História",
                                        "Geografia", "Português", "Inglês"
                                    ].map((materia) => (
                                        <label key={materia} className="flex items-center gap-2 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={materias.includes(materia)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setMaterias([...materias, materia]);
                                                    } else {
                                                        setMaterias(materias.filter((m) => m !== materia));
                                                    }
                                                }}
                                            />
                                            {materia}
                                        </label>
                                    ))}
                                </div>

                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                                    >
                                        Confirmar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-blue-50 border border-blue-200 text-blue-700 rounded-md p-3 flex items-start gap-2 mb-6 md:mt-4">
                        <GraduationCap className="w-10 h-5 mt-1 text-blue-500" />
                        <div>
                            <p className="text-sm font-semibold">Professores com perfil completo recebem mais alunos</p>
                            <p className="text-xs font-thin">Preencha todas as informações e aumente suas chances de ser escolhido pelos alunos.</p>
                        </div>
                    </div>

                    <ActionButtons />

                </form>
            );

        case "Foto e Documentos":
            return (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-2">Foto de Perfil</h2>
                    <p className="text-gray-600 mb-4">Adicione uma foto profissional para aumentar a confiança dos alunos.</p>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-23 h-23 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                            <User className="w-10 h-10 text-gray-400" />
                        </div>
                        <button onClick={abrirInput} className="bg-[#3970B7] text-sm text-white font-semibold px-3 py-4 rounded hover:bg-blue-700 flex items-center gap-2 cursor-pointer">
                            <Upload className="w-5 h-5" />
                            Selecionar Imagem
                        </button>

                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} />

                    </div>

                    <h2 className="text-xl font-semibold mb-2">Certificados e Documentos</h2>
                    <p className="text-gray-600 mb-4">Adicione seus diplomas, certificados e outros documentos relevantes</p>
                    <button className="bg-[#3970B7] text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2 mb-6 cursor-pointer">
                        <Upload className="w-5 h-5" />
                        Adicionar Documentos
                    </button>

                    <ActionButtons />

                </div>
            );
        case "Seguranca":
            return (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-2">Segurança da Conta</h2>
                    <p className="text-gray-600 mb-4">Atualize sua senha para proteger sua conta</p>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="nova-senha">
                            Nova Senha
                        </label>
                        <div className="relative">

                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="nova-senha"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Digite a nova senha"
                        />
                        <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="hover:cursor-pointer w-5 h-5" />
                                ) : (
                                    <EyeIcon className="hover:cursor-pointer w-5 h-5" />
                                )}
                        </button>

                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="confirmar-senha">
                            Confirmar Nova Senha
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmar-senha"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Confirme a nova senha"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="hover:cursor-pointer w-5 h-5" />
                                ) : (
                                    <EyeIcon className="hover:cursor-pointer w-5 h-5" />
                                )}
                            </button>
                        </div>
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
