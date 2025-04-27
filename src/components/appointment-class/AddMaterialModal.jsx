import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { useIsMobile } from '../../hooks/useIsMobile';

const AddMaterialModal = ({ isOpen, onClose, onAddMaterial }) => {
    const isMobile = useIsMobile();
    const [materialName, setMaterialName] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddMaterial({ name: materialName, file });
        setMaterialName('');
        setFile(null);
        onClose();
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(17, 22, 39, 0.75)' }}
        >
            <div className={`bg-white rounded-md shadow-lg ${isMobile ? 'w-[90%] max-w-[400px] p-4' : 'w-[450px] p-6'}`}>
                {/* Header */}
                <div className="relative flex items-center border-b pb-3">
                    {/* centered title */}
                    <h2 className="flex-1 text-blue-600 font-medium text-center">
                        Adicionar Material de Aula
                    </h2>

                    {/* perfectly centered “X” in the top-right corner */}
                    <button
                        onClick={onClose}
                        aria-label="Fechar"
                        className="absolute right-4 top-1/2 -translate-y-8/10  
               text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <label className="block text-sm text-gray-600 mb-1">
                            Nome do Material
                        </label>
                        <input
                            type="text"
                            value={materialName}
                            onChange={(e) => setMaterialName(e.target.value)}
                            placeholder="Ex: Lista de Matemática 4° Ano"
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm text-gray-600 mb-1">
                            Arquivo do Material
                        </label>
                        <div className="border border-gray-300 rounded p-2 text-sm text-gray-500 flex items-center justify-between">
                            <span>{file ? file.name : 'Nenhum arquivo selecionado'}</span>
                            <div className="flex items-center">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="file-upload"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="ml-2 text-blue-600 cursor-pointer hover:text-blue-800 text-sm"
                                >
                                    Escolher
                                </label>
                            </div>
                        </div>
                    </div>

                    <p className="text-xs text-gray-500 pt-1">
                        Adicione PDFs, imagens ou links para o material que está sendo utilizado na aula.
                    </p>

                    <button
                        type="submit"
                        className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded flex items-center justify-center text-sm"
                    >
                        <Upload size={16} className="mr-2" />
                        Adicionar Material
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddMaterialModal;
