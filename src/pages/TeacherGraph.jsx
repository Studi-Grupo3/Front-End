import InfoCard from "../components/InfoCard";
import { GraphCard } from "../components/dashboard-admin/GraphCard";
import NavbarPanel from "../components/NavbarPanel";

// Função utilitária para converter dados simples para o formato Chart.js
function toChartData({ data, color, type, title }) {
  return {
    labels: data.map((d) => d.label),
    datasets: [
      {
        label: type === "line" ? "Avaliação média" : title.includes("Aulas") ? "Total de aulas" : "Quantidade de aulas",
        data: data.map((d) => d.value),
        backgroundColor: color,
        borderColor: color,
        fill: type !== "line",
        tension: 0.4,
      },
    ],
  };
}

// Gráficos superiores
const chartsTop = [
  {
    title: "Distribuição por Disciplinas",
    type: "bar",
    chartData: toChartData({
      data: [
        { label: "Matemática", value: 27 },
        { label: "Química", value: 19 },
        { label: "Inglês", value: 12 },
        { label: "Geografia", value: 8 },
      ],
      color: "rgba(59, 130, 246, 0.5)",
      type: "bar",
      title: "Distribuição por Disciplinas",
    }),
    options: {
      indexAxis: "y",
      plugins: { legend: { display: false } },
      scales: { x: { beginAtZero: true } },
    },
  },
  {
    title: "Aulas Ministradas",
    type: "bar",
    chartData: toChartData({
      data: [
        { label: "Jan", value: 15 },
        { label: "Fev", value: 19 },
        { label: "Mar", value: 14 },
        { label: "Abr", value: 21 },
        { label: "Mai", value: 13 },
        { label: "Jun", value: 19 },
      ],
      color: "rgba(59, 78, 246, 0.7)",
      type: "bar",
      title: "Aulas Ministradas",
    }),
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } },
    },
  },
];

// Gráfico inferior
const chartsBottom = [
  {
    title: "Avaliação dos Alunos",
    type: "line",
    chartData: toChartData({
      data: [
        { label: "Jan", value: 4.8 },
        { label: "Fev", value: 4.9 },
        { label: "Mar", value: 4.9 },
        { label: "Abr", value: 5.0 },
        { label: "Mai", value: 4.8 },
        { label: "Jun", value: 4.9 },
      ],
      color: "rgba(59, 130, 246, 1)",
      type: "line",
      title: "Avaliação dos Alunos",
    }),
    options: {
      plugins: {
        legend: {
          display: true,
          labels: { boxWidth: 12, padding: 15 },
        },
      },
      scales: { y: { min: 0, max: 8 } },
    },
  },
];

const metrics = [
  {
    title: "Total de Aulas",
    value: 98,
    subtitle: "+8% em relação ao período anterior",
    icon: <span className="text-xl">💲</span>,
  },
  {
    title: "Média de Avaliação",
    value: 4.9,
    subtitle: "+0.2 em relação ao período anterior",
    icon: <span className="text-xl">👤</span>,
  },
  {
    title: "Total de Horas",
    value: "156h",
    subtitle: "+12h em relação ao período anterior",
    icon: <span className="text-xl">📋</span>,
  },
];

export default function TeacherGraph() {
  return (
    <div className="bg-[#f9fafb] min-h-screen flex flex-col">
      <div className="top-0 left-0 w-full z-50">
        <NavbarPanel />
      </div>
      <div className="max-w-7xl mx-auto w-full flex-1 pt-7 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Métricas e Desempenho</h2>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <span className="text-gray-700 font-medium">Período:</span>
            <select className="border rounded-md px-3 py-2 text-sm">
              <option>Último semestre</option>
              <option>Último mês</option>
              <option>Último ano</option>
            </select>
          </div>
        </div>
        {/* Cards de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {metrics.map((item, idx) => (
            <InfoCard
              key={idx}
              title={item.title}
              value={item.value}
              subtitle={item.subtitle}
              icon={item.icon}
            />
          ))}
        </div>
        {/* Gráficos superiores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <GraphCard title={chartsTop[0].title} type={chartsTop[0].type} data={chartsTop[0].chartData} options={chartsTop[0].options} />
          <GraphCard title={chartsTop[1].title} type={chartsTop[1].type} data={chartsTop[1].chartData} options={chartsTop[1].options} />
        </div>
      </div>
    </div>
  );
}