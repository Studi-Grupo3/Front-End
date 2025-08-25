import { EyeIcon, GraduationCap, Lock, Save, Upload, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ActionButtons from "./ActionButtons";
import { EyeSlashIcon } from "@heroicons/react/24/outline";
import { mascararCelular, validarConfirmacaoSenha } from "../../utils/formUtils";
import { showAlert } from "../ShowAlert";
import { teacherService } from "../../services/teacherService";

export default function ContentTeacherRegistration({ current, formData, onChange, onSave }) {

    const [showModal, setShowModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const professorId = localStorage.getItem("userId");
    const fileInputRef = useRef(null);
    const [confirmSenha, setConfirmSenha] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");

    useEffect(() => {
        const fotoSalva = localStorage.getItem("fotoPerfilProfessor");
        if (fotoSalva) setPreviewUrl(fotoSalva);
    }, []);

    // Função para converter arquivo em base64
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.onerror = e => reject(e);
            reader.readAsDataURL(file);
        });
    };

    const handleFotoMock = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const base64 = await fileToBase64(file);
        setPreviewUrl(base64);
        localStorage.setItem("fotoPerfilProfessor", base64);
        showAlert({
            title: "Foto atualizada!",
            text: `Sua foto foi selecionada com sucesso!\nArquivo: ${file.name}\nTamanho: ${(file.size / 1024).toFixed(2)} KB`,
            icon: "success"
        });
    };

    switch (current) {
        case "Informacoes Pessoais":
            return (
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={e => { e.preventDefault(); onSave(); }}>
                    {[
                        { label: "Nome Completo", type: "text", placeholder: "Nome completo", field: "name" },
                        { label: "Email", type: "email", placeholder: "seu.email@exemplo.com", field: "email" },
                        { label: "Telefone", type: "tel", placeholder: "(00) 00000-0000", field: "cellphoneNumber", mask: mascararCelular },
                        { label: "Data de Nascimento", type: "date", placeholder: "dd/mm/aaaa", field: "dateBirth" },
                        { label: "Sobre Você", type: "textarea", placeholder: "Descreva sua experiência, metodologia de ensino e áreas de especialização...", field: "resumeTeacher", rows: 4 }
                    ].map(({ label, type, placeholder = "", field, mask, rows }) => (
                        <div key={label} className={field === "resumeTeacher" ? "md:col-span-2" : "flex flex-col"}>
                            <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor={field}>
                                {label}
                            </label>

                            {type === "textarea" ? (
                                <textarea
                                    id={field}
                                    placeholder={placeholder}
                                    rows={rows || 4}
                                    value={formData[field] || ""}
                                    onChange={e => onChange(field, e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            ) : (
                                <input
                                    id={field}
                                    type={type}
                                    placeholder={placeholder}
                                    className="p-2 border border-gray-300 rounded-md"
                                    value={formData[field] || ""}
                                    onChange={e => {
                                        const value = mask ? mask(e.target.value) : e.target.value;
                                        onChange(field, value);
                                    }}
                                />
                            )}
                        </div>
                    ))}

                    <div className="md:col-span-2">
                        <ActionButtons onSave={onSave} />
                    </div>
                </form>

            );

        case "Qualificacoes":
            return (
                <form className="space-y-4" onSubmit={e => { e.preventDefault(); onSave(); }}>

                    <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Formação Acadêmica</label>
                            <select
                                onChange={e => onChange("academicFormation", e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm cursor-pointer"
                                value={formData.academicFormation || ""}
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
                                value={formData.yearsExperience || ""}
                                onChange={e => onChange("yearsExperience", e.target.value)}
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
                            {(!formData.subject || formData.subject === "") && <span className="text-gray-400">Clique para selecionar...</span>}
                            {formData.subject && (
                                <span
                                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs flex items-center gap-1"
                                >
                                    {formData.subject}
                                    <button
                                        type="button"
                                        onClick={e => {
                                            e.stopPropagation();
                                            onChange("subject", "");
                                        }}
                                        className="text-blue-600 hover:text-red-500"
                                    >
                                        ×
                                    </button>
                                </span>
                            )}
                        </div>
                    </div>

                    {showModal && (
                        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-md">
                                <h2 className="text-lg font-semibold mb-4">Selecione a matéria</h2>
                                <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto mb-4">
                                    {[
                                        "Matemática", "Física", "Química", "Biologia", "História",
                                        "Geografia", "Português", "Inglês", "Sociologia", "Filosofia",
                                        "Arte", "Ciências", "Alfabetização", "Espanhol"
                                    ].map((subject) => (
                                        <label key={subject} className="flex items-center gap-2 text-sm">
                                            <input
                                                type="radio"
                                                name="subject"
                                                checked={formData.subject === subject}
                                                onChange={() => onChange("subject", subject)}
                                            />
                                            {subject}
                                        </label>
                                    ))}
                                </div>

                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm"
                                        type="button"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                                        type="button"
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

                    <ActionButtons onSave={onSave} />

                </form>
            );

        case "Foto e Documentos":
            return (
                <div className="space-y-4">
                    <div className="flex flex-col items-center text-center gap-4 mb-8">
                        <div className="w-40 h-40 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-white">
                            {previewUrl ? (
                                <img
                                    src={previewUrl}
                                    alt="Pré-visualização"
                                    className="object-cover w-38 h-38 rounded-full"
                                />
                            ) : (
                                <User className="w-32 h-32 text-gray-400" />
                            )}
                        </div>

                        <p className="text-sm text-gray-600">Adicione uma foto profissional para aumentar a confiança dos alunos.</p>

                        <button onClick={() => fileInputRef.current.click()} className="bg-[#3970B7] text-sm text-white font-semibold px-2 py-3 rounded flex items-center gap-2 cursor-pointer">
                            <Upload className="w-5 h-5" />
                            Selecionar Foto
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFotoMock}
                        />
                    </div>

                    <ActionButtons onSave={onSave} />

                </div>
            );
        // case "Seguranca":

        //     const handleSaveSenha = (e) => {
        //         e.preventDefault();
        //         if (!validarConfirmacaoSenha(formData.novaSenha || "", confirmSenha)) {
        //             showAlert({
        //                 title: "Erro!",
        //                 text: "As senhas não coincidem.",
        //                 icon: "error"
        //             });
        //             return;
        //         }
        //         onSave();
        //     };

        //     return (
        //         <form className="space-y-4" onSubmit={handleSaveSenha}>
        //             <h2 className="text-xl font-semibold mb-2">Segurança da Conta</h2>
        //             <p className="text-gray-600 mb-4">Atualize sua senha para proteger sua conta</p>

        //             <div className="mb-4">
        //                 <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="nova-senha">
        //                     Nova Senha
        //                 </label>
        //                 <div className="relative">

        //                     <input
        //                         type={showPassword ? 'text' : 'password'}
        //                         id="nova-senha"
        //                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                         placeholder="Digite a nova senha"
        //                         value={formData.novaSenha || ""}
        //                         onChange={e => onChange("novaSenha", e.target.value)}
        //                     />
        //                     <button
        //                         type="button"
        //                         className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
        //                         onClick={() => setShowPassword(!showPassword)}
        //                     >
        //                         {showPassword ? (
        //                             <EyeSlashIcon className="hover:cursor-pointer w-5 h-5" />
        //                         ) : (
        //                             <EyeIcon className="hover:cursor-pointer w-5 h-5" />
        //                         )}
        //                     </button>

        //                 </div>
        //             </div>

        //             <div className="mb-4">
        //                 <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="confirmar-senha">
        //                     Confirmar Nova Senha
        //                 </label>
        //                 <div className="relative">
        //                     <input
        //                         type={showConfirmPassword ? 'text' : 'password'}
        //                         id="confirmar-senha"
        //                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                         placeholder="Confirme a nova senha"
        //                         value={confirmSenha}
        //                         onChange={e => setConfirmSenha(e.target.value)}
        //                     />
        //                     <button
        //                         type="button"
        //                         className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
        //                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        //                     >
        //                         {showPassword ? (
        //                             <EyeSlashIcon className="hover:cursor-pointer w-5 h-5" />
        //                         ) : (
        //                             <EyeIcon className="hover:cursor-pointer w-5 h-5" />
        //                         )}
        //                     </button>
        //                 </div>
        //             </div>

        //             <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-3 rounded mb-6 flex items-start gap-2">
        //                 <Lock className="w-10 h-5" />
        //                 <div>
        //                     <p className="text-sm font-semibold">Mantenha sua conta segura</p>
        //                     <p className="text-xs">Use uma senha forte com pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.</p>
        //                 </div>
        //             </div>

        //             <ActionButtons onSave={handleSaveSenha} />

        //         </form>
        //     );
    }
}
