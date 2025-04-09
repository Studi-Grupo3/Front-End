import NavbarPanel from "../components/NavbarPanel";

const CardPanelItem = ({ title, description, buttonLink }) => {
  const styles = {
    "Completar Cadastro": {
      bg: "bg-[#FFF5F5]",
      text: "text-[#FF6D0C]",
      button: "text-[#FF7200]"
    },
    "Agendamentos": {
      bg: "bg-[#EFF6FF]",
      text: "text-[#1E40AF]",
      button: "text-[#2563EB]"
    },
    "Calendário": {
      bg: "bg-[#FCFDF0]",
      text: "text-[#A39316]",
      button: "text-[#A39316]"
    }
  };

  return (
    <div className={`w-[17vw] h-[30vh] rounded-md shadow-md p-5 mt-5 border ${styles[title].bg}`}>
      <h2 className={`text-[20px] mb-2 font-semibold ${styles[title].text}`}>{title}</h2>
      <p className="text-sm text-black">{description}</p>
      <span className={`block mt-6 font-bold ${styles[title].button}`}>
        {buttonLink}
      </span>
    </div>
  );
};

const StudentInitial = () => {
  const items = [
    { title: "Completar Cadastro", description: "Seu cadastro ainda está incompleto.", buttonLink: "Completar cadastro →" },
    { title: "Agendamentos", description: "Visualize e gerencie suas aulas agendadas.", buttonLink: "Ver agendamentos →" },
    { title: "Calendário", description: "Visualize suas aulas em um calendário mensal.", buttonLink: "Ver calendário →" }
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F8] text-[#333] font-sans flex flex-col items-center">
      <div className="w-full">
        <NavbarPanel />
      </div>

      <div className="flex justify-center items-center w-full h-[100px] text-xs mb-6">
        <h1 className="text-lg font-semibold text-gray-800">Painel do Aluno</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-5 w-[895px] h-[350px]">
        <h1 className="text-[25px] font-bold text-black mb-5">Bem-vindo(a) ao Painel do Aluno</h1>
        <span className="text-[15px] text-black mb-2 block">
          Aqui você pode gerenciar suas aulas, verificar agendamentos e realizar pagamentos.
        </span>

        <div className="flex justify-between gap-5 flex-wrap mt-4">
          {items.map((item, index) => (
            <CardPanelItem
              key={index}
              title={item.title}
              description={item.description}
              buttonLink={item.buttonLink}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentInitial;
