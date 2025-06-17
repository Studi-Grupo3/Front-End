import { Save } from "lucide-react"

const ActionButtons = ({onSave}) => {
    return (
        <div className="flex justify-between gap-4 pt-2 text-xs md:text-sm">
            <button type="button" className="w-1/4 py-2 rounded-md border border-gray-400 text-gray-700 cursor-pointer">
                Cancelar
            </button>
            <button type="submit" onClick={onSave} className="w-1/2 py-2 px-2 rounded-md bg-[#EAB308] text-black flex items-center justify-center gap-2 cursor-pointer">
                <Save className="w-5 h-5" />
                Salvar Alterações
            </button>
        </div>
    )
}

export default ActionButtons;
