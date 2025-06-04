// src/AppRouter.jsx  (ou onde você tenha o AppRouter)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute"; // ajuste o caminho conforme necessário

import { VisaoGeral } from "../pages/dashboard-admin/VisaoGeral";
import { Agendamentos } from "../pages/dashboard-admin/Agendamentos";
import { Professores } from "../pages/dashboard-admin/Professores";
import { GerenciamentoProfessores } from "../pages/dashboard-admin/GerenciamentoProfessores";
import { Pagamentos } from "../pages/dashboard-admin/Pagamentos";
import { Configuracoes } from "../pages/dashboard-admin/Configuracoes";
import { Relatorios } from "../pages/dashboard-admin/Relatorios";
import HomePage from "../pages/HomePage";
import { AppointmentManager } from "../pages/AppointmentManager";
import { CheckoutPage } from "../pages/CheckoutPage";
import EmailVerificationPage from "../pages/EmailVerificationPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import StudentInitialPage from "../pages/StudentInitialPage";
import TeacherInitialPage from "../pages/TeacherInitialPage";
import TeacherChartClassesPage from "../pages/TeacherChartClassesPage";
import TeacherLessonsHistoryPage from "../pages/TeacherLessonsHistoryPage";
import TeacherGraph from "../pages/TeacherGraph";
import TeacherRequests from "../pages/TeacherRequests";
import NotFoundPage from "../pages/NotFoundPage";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* ROTAS PÚBLICAS */}
        <Route path="/entrar" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/cadastrar" element={<RegisterPage />} />
        <Route path="/redefinir-senha" element={<EmailVerificationPage />} />
        <Route path="/professor/inicio" element={<TeacherInitialPage />} />
        <Route path="/professor/tabela-aula" element={<TeacherChartClassesPage />} />
        <Route path="/professor/historico-aulas" element={<TeacherLessonsHistoryPage />} />
        <Route path="/professor/metricas-aula" element={<TeacherGraph />} />
        <Route path="/professor/solicitacoes" element={<TeacherRequests />} />


        {/* ROTAS PROTEGIDAS */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<VisaoGeral />} />
          <Route path="/dashboard/gerenciamento" element={<GerenciamentoProfessores />} />
          <Route path="/dashboard/professores" element={<Professores />} />
          <Route path="/dashboard/agendamentos" element={<Agendamentos />} />
          <Route path="/dashboard/pagamentos" element={<Pagamentos />} />
          <Route path="/dashboard/configuracoes" element={<Configuracoes />} />
          <Route path="/dashboard/relatorios" element={<Relatorios />} />

          <Route path="/aluno/inicio" element={<StudentInitialPage />} />
          
          {/*
            Aqui incluímos DUAS rotas para “/agendamentos/gerenciar”:
            1) Sem parâmetro → carrega sempre a aba padrão (Upcoming)  
            2) Com parâmetro → :tab (upcoming, past, calendar, etc.)
          */}
          <Route path="/agendamentos/gerenciar" element={<AppointmentManager />} />
          <Route path="/agendamentos/gerenciar/:tab" element={<AppointmentManager />} />

          <Route path="/pagamento" element={<CheckoutPage />} />

          <Route path="/students" element={<h1>Students (Substituir depois)</h1>} />
          <Route path="/teachers" element={<h1>Teachers (Substituir depois)</h1>} />
          <Route path="/appointments" element={<h1>Appointments (Substituir depois)</h1>} />
        </Route>

        {/* CATCH-ALL (404) */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};
