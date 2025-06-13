import React from 'react';
import { Laptop, MapPin } from 'lucide-react';

export default function ClassModelSelection({ data, onUpdate, onNext }) {
  const choice = data.classModel;

  const base =
    "w-full sm:w-105 border rounded-lg px-8 py-10 transition-colors cursor-pointer flex flex-col items-center text-center";
  const def = "border-gray-300 hover:border-[#3970B7]";
  const active =
    "border-[#3970B7] shadow-[0_0_0_2px_rgba(57,112,183,0.25)]";
  const radio = sel =>
    `flex items-center justify-center w-5 h-5 rounded-full border-2 mb-3 ${
      sel
        ? "border-[#3970B7] bg-[#3970B7]"
        : "border-[#3970B7] bg-transparent"
    }`;

  const select = model => {
    onUpdate({ classModel: model });
  };

  const enabled = Boolean(choice);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-8 justify-center">
        <div
          onClick={() => select('online')}
          className={`${base} ${choice === 'online' ? active : def}`}
        >
          <span className={radio(choice === 'online')} />
          <Laptop className="w-8 h-8 text-[#3970B7] mb-3" />
          <h2 className="font-semibold mb-2">Online</h2>
          <p className="text-gray-600 text-sm mb-4">
            Aulas ao vivo pela internet com nossos professores qualificados.
          </p>
          <ul className="text-left text-sm text-gray-700 space-y-1">
            {[
              'Economize tempo de deslocamento',
              'Flexibilidade de horários',
              'Material digital incluído',
            ].map(t => (
              <li key={t} className="flex items-start">
                <span className="text-green-500 mr-2">✔</span> {t}
              </li>
            ))}
          </ul>
        </div>

        <div
          onClick={() => select('home')}
          className={`${base} ${choice === 'home' ? active : def}`}
        >
          <span className={radio(choice === 'home')} />
          <MapPin className="w-8 h-8 text-[#3970B7] mb-3" />
          <h2 className="font-semibold mb-2">Domicílio</h2>
          <p className="text-gray-600 text-sm mb-4">
            Aulas presenciais em casa com professores qualificados.
          </p>
          <ul className="text-left text-sm text-gray-700 space-y-1">
            {[
              'Aprendizado presencial',
              'Interação direta com professores',
              'Material digital incluído',
            ].map(t => (
              <li key={t} className="flex items-start">
                <span className="text-green-500 mr-2">✔</span> {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onNext}
          disabled={!enabled}
          className={`w-64 sm:w-56 py-3 font-medium rounded ${
            enabled
              ? 'bg-[#3970B7] text-white hover:bg-[#2e5a94] cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
