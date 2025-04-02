const CardPanelItem = ({ title, description, buttonLink }) => {
  const styles = {
    "Completar Cadastro": { backgroundColor: "#FFF5F5", color: "#FF6D0C", buttonColor: "#FF7200" },
    "Agendamentos": { backgroundColor: "#EFF6FF", color: "#1E40AF", buttonColor: "#2563EB" },
    "Calendário": { backgroundColor: "#FCFDF0", color: "#A39316", buttonColor: "#A39316" }
  };

  return (
    <div className="card-panel-item" style={{ backgroundColor: styles[title].backgroundColor }}>
      <h2 style={{ color: styles[title].color }}>{title}</h2>
      <span>{description}</span>
      <br />
      <span style={{ display: "block", marginTop: "25px", color: styles[title].buttonColor, fontWeight: "bold" }}>
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
    <div>
      <div className="title-panel">
        <h1>Painel do Aluno</h1>
      </div>
       <div className="card-panel">
          <h1>Bem-vindo(a) ao Painel do Aluno</h1>
          <span>Aqui você pode gerenciar suas aulas, verificar agendamentos e realizar pagamentos.</span>
          <div className="content-panel">
            {items.map((item, index) => (
              <CardPanelItem key={index} title={item.title} description={item.description} buttonLink={item.buttonLink} />
            ))}
          </div>
        </div>
    </div>
  );
};

export default StudentInitial;