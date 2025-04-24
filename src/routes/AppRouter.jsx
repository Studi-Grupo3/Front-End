import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { VisaoGeral } from "../pages/dashboard-admin/VisaoGeral";
import { Agendamentos } from "../pages/dashboard-admin/Agendamentos";
import { Professores } from "../pages/dashboard-admin/Professores";
import { Financas } from "../pages/dashboard-admin/Financas";
import { Pagamentos } from "../pages/dashboard-admin/Pagamentos";
import { Configuracoes } from "../pages/dashboard-admin/Configuracoes";
import { Relatorios } from "../pages/dashboard-admin/Relatorios";

// Novas páginas
import {AppointmentManager} from "../pages/AppointmentManager";
import {CheckoutPage} from "../pages/CheckoutPage";
import EmailVerificationPage from "../pages/EmailVerificationPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import StudentInitialPage from "../pages/StudentInitialPage";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<VisaoGeral />} />
        <Route path="/dashboard/financas" element={<Financas />} />
        <Route path="/dashboard/professores" element={<Professores />} />
        <Route path="/dashboard/agendamentos" element={<Agendamentos />} />
        <Route path="/dashboard/pagamentos" element={<Pagamentos />} />
        <Route path="/dashboard/configuracoes" element={<Configuracoes />} />
        <Route path="/dashboard/relatorios" element={<Relatorios />} />

        <Route path="/agendamentos/gerenciar" element={<AppointmentManager />} />
        <Route path="/pagamento" element={<CheckoutPage />} />
        <Route path="/verificar-email" element={<EmailVerificationPage />} />
        <Route path="/entrar" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/aluno/inicio" element={<StudentInitialPage />} />

        <Route path="/students" element={<h1>Students (Substituir depois)</h1>} />
        <Route path="/teachers" element={<h1>Teachers (Substituir depois)</h1>} />
        <Route path="/appointments" element={<h1>Appointments (Substituir depois)</h1>} />

        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </Routes>
    </Router>
  );
};
