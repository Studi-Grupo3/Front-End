import NavbarPanel from "../components/NavbarPanel";

const CardPanelItem = ({ title, description, buttonLink }) => {
  const styles = {
    "Completar Cadastro": {
      bg: "bg-[#FFF5F5]",
      text: "text-[#FF6D0C]",
      button: "text-[#FF7200]",
    },
    Agendamentos: {
      bg: "bg-[#EFF6FF]",
      text: "text-[#1E40AF]",
      button: "text-[#2563EB]",
    },
    Calendário: {
      bg: "bg-[#FCFDF0]",
      text: "text-[#A39316]",
      button: "text-[#A39316]",
    },
  };

  return (
    <div
      className={`w-full sm:w-[280px] md:w-[300px] lg:w-[320px] h-auto rounded-md shadow-md p-5 ${styles[title]?.bg} flex flex-col justify-between`}
    >
      <div>
        <h2 className={`text-[20px] mb-2 font-semibold ${styles[title]?.text}`}>
          {title}
        </h2>
        <p className="text-base text-black">{description}</p>
      </div>
      <span className={`mt-4 font-bold ${styles[title]?.button}`}>
        {buttonLink}
      </span>
    </div>
  );
};

const StudentInitial = () => {
  const items = [
    {
      title: "Completar Cadastro",
      description: "Seu cadastro ainda está incompleto.",
      buttonLink: "Completar cadastro →",
    },
    {
      title: "Agendamentos",
      description: "Visualize e gerencie suas aulas agendadas.",
      buttonLink: "Ver agendamentos →",
    },
    {
      title: "Calendário",
      description: "Visualize suas aulas em um calendário mensal.",
      buttonLink: "Ver calendário →",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F8] text-[#333] font-sans flex flex-col items-center">
      <div className="w-full">
        <NavbarPanel />
      </div>

      <div className="flex justify-center items-center w-full h-[100px] text-center px-4">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Painel do Aluno
        </h1>
      </div>

      <div className="flex justify-center w-full px-4">
        <div className="bg-white rounded-lg shadow-md p-5 w-full max-w-6xl">
          <h1 className="text-xl md:text-2xl font-bold text-black mb-4">
            Bem-vindo(a) ao Painel do Aluno
          </h1>

          <p className="text-sm md:text-base text-black mb-6">
            Aqui você pode gerenciar suas aulas, verificar agendamentos e
            realizar pagamentos.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
    </div>
  );
};

export default StudentInitial;
