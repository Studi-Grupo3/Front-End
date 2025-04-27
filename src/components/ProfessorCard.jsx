// src/components/ProfessorCard.jsx
export default function ProfessorCard({ name, location, subject, bio, image }) {
  return (
    <div className="w-80 bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
      <img
        src={image || "/img/default-professor.png"}
        alt={name}
        className="h-56 w-full object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold mb-1">{name}</h2>
        <p className="text-gray-600 text-sm mb-2">{location}</p>
        <p className="text-blue-600 font-bold text-sm mb-2">{subject}</p>
        <p className="text-gray-500 text-sm flex-grow">{bio}</p>
        <div className="mt-4">
          <button className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition">
            Agendar aula →
          </button>
        </div>
      </div>
    </div>
  );
}
