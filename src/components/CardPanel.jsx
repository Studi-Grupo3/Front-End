const CardPanelItem = ({ title, description }) => {
    const backgroundColors = {
      "Completar Cadastro": "#FFF5F5",
      "Agendamentos": "#EFF6FF",
      "Pagamentos": "#FCFDF0"
    };
  
    return (
      <div className="card-panel-item" style={{ backgroundColor: backgroundColors[title] }}>
        <h2>{title}</h2>
        <span>{description}</span>
      </div>
    );
  };
  
  export default CardPanelItem;