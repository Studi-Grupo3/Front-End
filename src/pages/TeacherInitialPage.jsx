import React, { useEffect, useState } from "react";
import InfoCard from "../components/InfoCard";
import ProximasAulas from "../components/ProximasAulas";
import MateriaisAlunos from "../components/MateriaisAlunos";
import NavbarPanel from "../components/NavbarPanel";
import { DollarSign, Users, Clock, LineChart } from "lucide-react";
import { teacherDashboardService } from "../services/teacherDashboardService";

export default function TeacherInitialPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    teacherDashboardService
      .getStats()
      .then(setStats)
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#f9fbfc] min-h-screen">
      <div className="w-full sticky top-0 z-50">
        <NavbarPanel role="teacher" />
      </div>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-screen-xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Bem-vindo, Professor Carlos
        </h2>

        {/* Cards informativos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <InfoCard
            title="Aulas Hoje"
            value={loading ? "..." : stats?.aulasHoje ?? 0}
            icon={<DollarSign className="w-4 h-4 text-gray-400" />}
            subtitle={loading ? "" : stats?.aulasHojeSubtitle}
          />
          <InfoCard
            title="Aulas Esta Semana"
            value={loading ? "..." : stats?.aulasSemana ?? 0}
            icon={<Users className="w-4 h-4 text-gray-400" />}
            subtitle={loading ? "" : stats?.aulasSemanaSubtitle}
          />
          <InfoCard
            title="Horas Ministradas"
            value={loading ? "..." : stats?.horasMinistradas ?? "0h"}
            icon={<Clock className="w-4 h-4 text-gray-400" />}
            subtitle={loading ? "" : stats?.horasMinistradasSubtitle}
          />
          <InfoCard
            title="Avaliação"
            value={loading ? "..." : stats?.avaliacao ?? "-"}
            icon={<LineChart className="w-4 h-4 text-gray-400" />}
            subtitle={loading ? "" : stats?.avaliacaoSubtitle}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/2 w-full">
            <ProximasAulas />
          </div>
          <div className="lg:w-1/2 w-full">
            <MateriaisAlunos />
          </div>
        </div>
      </div>
    </div>
  );
}
