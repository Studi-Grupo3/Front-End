import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { VisaoGeral } from "../pages/dashboard-admin/VisaoGeral";
import { Agendamentos } from "../pages/dashboard-admin/Agendamentos";
import { Professores } from "../pages/dashboard-admin/Professores";
import { Financas } from "../pages/dashboard-admin/Financas";
import { Pagamentos } from "../pages/dashboard-admin/Pagamentos";
import { Configuracoes } from "../pages/dashboard-admin/Configuracoes";
import { Relatorios } from "../pages/dashboard-admin/Relatorios";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
      <Route path="/dashboard" element={<VisaoGeral/>} />
      <Route path="/dashboard/financas" element={<Financas/>} />
      <Route path="/dashboard/professores" element={<Professores />} />
      <Route path="/dashboard/agendamentos" element={<Agendamentos />} />
      <Route path="/dashboard/pagamentos" element={<Pagamentos />} />
      <Route path="/dashboard/configuracoes" element={<Configuracoes />} />
      <Route path="/dashboard/relatorios" element={<Relatorios />} />

        <Route path="/login" element={<h1>Página de Login (Substituir depois)</h1>} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<h1>Dashboard (Substituir depois)</h1>} />
          
          <Route path="/students" element={<h1>Students (Substituir depois)</h1>} />
          <Route path="/teachers" element={<h1>Teachers (Substituir depois)</h1>} />
          <Route path="/appointments" element={<h1>Appointments (Substituir depois)</h1>} />
        </Route>

        
        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
