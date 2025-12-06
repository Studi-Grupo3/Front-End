import { useEffect, useState } from "react";
import InfoCard from "../components/InfoCard";
import { GraphCard } from "../components/dashboard-admin/GraphCard";
import NavbarPanel from "../components/NavbarPanel";
import { teacherService } from "../services/teacherService";

// mapeia seu enum Subject para label amigável
const mapSubjectToLabel = {
  MATH:       "Matemática",
  ENGLISH:    "Inglês",
  CHEMISTRY:  "Química",
  PHILOSOPHY: "Filosofia",
  // ... demais subjects
};

// mapeia weekday (1=Domingo…7=Sábado) para label
const mapWeekdayToLabel = {
  1: "Domingo",
  2: "Segunda",
  3: "Terça",
  4: "Quarta",
  5: "Quinta",
  6: "Sexta",
  7: "Sábado",
};

export default function TeacherGraph() {
  const [metrics, setMetrics]         = useState([]);
  const [chartsTop, setChartsTop]     = useState([]);
  const [chartsBottom, setChartsBottom] = useState([]);

  useEffect(() => {
    teacherService.getDashboard()
      .then(data => {
        const totalMinutes = data.totalHours; 
        const hours   = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const formattedHours = `${hours}h ${minutes}m`;

        setMetrics([
          {
            title: "Total de Aulas",
            value: data.totalLessons,
            subtitle: "Número de aulas registradas",
            icon: <span className="text-xl">📚</span>
          },
          {
            title: "Taxa de Cancelamento",
            value: `${data.cancellationPercentage.toFixed(1)}%`,
            subtitle: "Percentual de aulas canceladas",
            icon: <span className="text-xl">❌</span>
          },
          {
            title: "Total de Tempo",
            value: formattedHours,
            subtitle: "Tempo total de aula ministrado",
            icon: <span className="text-xl">⏱️</span>
          },
        ]);

        setChartsTop([
          {
            title: "Distribuição por Disciplinas",
            type: "bar",
            data: data.lessonsByDiscipline.map(d => ({
              label: mapSubjectToLabel[d.subject] || d.subject,
              value: d.count
            })),
            color: "rgba(59, 130, 246, 0.5)"
          }
        ]);

        setChartsBottom([
          {
            title: "Aulas por Dia da Semana",
            type: "bar",
            data: data.lessonsByWeekday.map(w => ({
              label: mapWeekdayToLabel[w.weekday] || String(w.weekday),
              value: w.count
            })),
            color: "rgba(59, 78, 246, 0.7)"
          }
        ]);
      })
      .catch(err => {
        console.error("Erro ao carregar dashboard:", err);
      });
  }, []);

  return (
    <div className="bg-[#f9fafb] min-h-screen flex flex-col">
      <div className="top-0 left-0 w-full z-50">
        <NavbarPanel />
      </div>
      <div className="max-w-7xl mx-auto w-full flex-1 pt-7 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Métricas e Desempenho</h2>
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

        {/* Gráficos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {chartsTop.map((cfg, i) => (
            <GraphCard
              key={i}
              title={cfg.title}
              type={cfg.type}
              data={cfg.data}
              color={cfg.color}
            />
          ))}
          {chartsBottom.map((cfg, i) => (
            <GraphCard
              key={i}
              title={cfg.title}
              type={cfg.type}
              data={cfg.data}
              color={cfg.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
