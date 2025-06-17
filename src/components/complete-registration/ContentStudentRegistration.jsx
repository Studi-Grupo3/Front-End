import { MoveDown, Upload, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ActionButtons from "./ActionButtons";
import { mascararCpf, mascararCelular } from "../../utils/formUtils";
import { showAlert } from "../ShowAlert";

export default function ContentStudentRegistration({ current, formData, onChange, onSave }) {

    const [previewUrl, setPreviewUrl] = useState("");
    const fileInputRef = useRef(null);

    useEffect(() => {
            const fotoSalva = localStorage.getItem("fotoPerfilAluno");
            if (fotoSalva) setPreviewUrl(fotoSalva);
        }, []);
    
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
            localStorage.setItem("fotoPerfilAluno", base64);
            showAlert({
                title: "Foto atualizada!",
                text: `Sua foto foi selecionada com sucesso!\nArquivo: ${file.name}\nTamanho: ${(file.size / 1024).toFixed(2)} KB`,
                icon: "success"
            });
        };

    switch (current) {
        case "Dados do Aluno":
            return (
                <form className="grid grid-cols-1 md:grid-cols-2 gap-10" onSubmit={e => { e.preventDefault(); onSave(); }}>
                    {[
                        { label: "Nome Completo do Aluno", type: "text", placeholder: "Nome completo", field: "name" },
                        { label: "Email do Aluno (opcional)", type: "email", placeholder: "seu.email@exemplo.com", field: "email" },
                        { label: "Data de Nascimento", type: "date", placeholder: "dd/mm/aaaa", field: "dateBirth" },
                        { label: "Série/Ano", type: "select", options: ["1ºEF", "2ºEF", "3ºEF", "4ºEF", "5ºEF", "6ºEF", "7ºEF", "8ºEF", "9ºEF", "1ºEM", "2ºEM", "3ºEM"], field: "schoolGrade" },
                        { label: "Telefone do Aluno (opcional)", type: "text", placeholder: "(00) 00000-0000", field: "cellphoneNumber", mask: mascararCelular },
                        { label: "Escola", type: "text", placeholder: "Nome da Escola", field: "schoolName" },
                    ].map(({ label, type, placeholder = "", options = [], field, mask }) => (
                        <div key={label} className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor={label}>
                                {label}
                            </label>

                            {type === "select" ? (
                                <select
                                    id={label}
                                    className="p-2 border border-gray-300 rounded-md"
                                    value={formData[field] || ""}
                                    onChange={e => onChange(field, e.target.value)}
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

        case "Responsavel":
            return (
                <form className="space-y-4" onSubmit={e => { e.preventDefault(); onSave(); }}>

                    <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-3 rounded mb-6 flex items-start gap-2">
                        <MoveDown className="w-10 h-8" />
                        <div>
                            <p className="text-sm font-semibold">Dados do responsável</p>
                            <p className="text-xs">Preencha as informações do responsável para contato e gerenciamento da conta</p>
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 md:gap-8 mb-4">
                        {[
                            { label: "Nome Completo do Responsável", type: "text", placeholder: "Nome completo do responsável", field: "responsibleName" },
                            { label: "Grau de Parentesco", type: "text", placeholder: "Grau de parentesco", field: "kinship" },
                            { label: "CPF do Responsável", type: "text", placeholder: "000.000.000-00", field: "responsibleCpf", mask: mascararCpf },
                            { label: "Telefone do Responsável (opcional)", type: "text", placeholder: "(00) 00000-0000", field: "responsibleCellphoneNumber", mask: mascararCelular },
                        ].map(({ label, type, placeholder = "", field, mask }) => (
                            <div key={label} className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor={label}>
                                    {label}
                                </label>
                                <input
                                    id={label}
                                    type={type}
                                    placeholder={placeholder}
                                    className="p-2 border border-gray-300 rounded-md"
                                    value={formData.responsible?.[field] || ""}
                                    onChange={e => {
                                        const value = mask ? mask(e.target.value) : e.target.value;
                                        onChange(field, value);
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    <ActionButtons onSave={onSave} />

                </form>
            );
        case "Foto do Aluno":

            return (
                <div className="space-y-4">
                    <div className="flex flex-col items-center text-center gap-4 mb-6">
                        <div className="w-36 h-36 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-white">
                            {previewUrl ? (
                                <img
                                    src={previewUrl}
                                    alt="Pré-visualização"
                                    className="object-cover w-34 h-34 rounded-full"
                                />
                            ) : (
                                <User className="w-32 h-32 text-gray-400" />
                            )}
                        </div>

                        <h2 className="text-xl font-semibold">Foto do Aluno</h2>

                        <p className="text-sm text-gray-600">Adicione uma foto do aluno para personalizar o perfil. <br />Arquivos JPG, PNG com no máximo 5MB.</p>

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
    }
}
