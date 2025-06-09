import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {ProtectedRoute} from "./ProtectedRoute"; // Ajuste o caminho se necessário

import { VisaoGeral } from "../pages/dashboard-admin/VisaoGeral";
import { Agendamentos } from "../pages/dashboard-admin/Agendamentos";
import { Professores } from "../pages/dashboard-admin/Professores";
import { GerenciamentoProfessores } from "../pages/dashboard-admin/GerenciamentoProfessores";
import { Pagamentos } from "../pages/dashboard-admin/Pagamentos";
import { Configuracoes } from "../pages/dashboard-admin/Configuracoes";
import { Relatorios } from "../pages/dashboard-admin/Relatorios";
import  HomePage  from "../pages/HomePage";
import { AppointmentManager } from "../pages/AppointmentManager";
import { CheckoutPage } from "../pages/CheckoutPage";
import EmailVerificationPage from "../pages/EmailVerificationPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import StudentInitialPage from "../pages/StudentInitialPage";
import ClassDetailsForm from "../components/appointment-class/ClassDetailsForm";
import  ClassModelSelection  from "../components/appointment-class/ClassModelSelection";
import AddMaterialModal from "../components/appointment-class/AddMaterialModal";
import ChooseProfessor from "../pages/ChooseProfessor";
import Scheduling from "../pages/Scheduling";
import Payment from "../pages/Payment";
import ConfirmedPayment from "../pages/ConfirmedPayment";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>

        {/* ROTAS PÚBLICAS */}
        <Route path="/logar" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/cadastrar" element={<RegisterPage />} />
        <Route path="/redefinir-senha" element={<EmailVerificationPage />} />

        {/* ROTAS PROTEGIDAS */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<VisaoGeral />} />
          <Route path="/dashboard/gerenciamento" element={<GerenciamentoProfessores />} />
          <Route path="/dashboard/professores" element={<Professores />} />
          <Route path="/dashboard/agendamentos" element={<Agendamentos />} />
          <Route path="/dashboard/pagamentos" element={<Pagamentos />} />
          <Route path="/dashboard/configuracoes" element={<Configuracoes />} />
          <Route path="/dashboard/relatorios" element={<Relatorios />} />

          
          <Route path="/aluno/formulario" element={<ClassDetailsForm />} />
          <Route path="/aluno/modelo-aula" element={<ClassModelSelection />} />
          <Route path="/aluno/escolher-professor" element={<ChooseProfessor />} />
          <Route path="/aluno/agendar-aula" element={<Scheduling />} />
          <Route path="/aluno/pagamento" element={<Payment />} />
          <Route path="/aluno/concluido" element={<ConfirmedPayment />} />


          <Route path="/aluno/inicio" element={<StudentInitialPage />} />
          <Route path="/agendamentos/gerenciar" element={<AppointmentManager />} />
          <Route path="/pagamento" element={<CheckoutPage />} />

          <Route path="/students" element={<h1>Students (Substituir depois)</h1>} />
          <Route path="/teachers" element={<h1>Teachers (Substituir depois)</h1>} />
          <Route path="/appointments" element={<h1>Appointments (Substituir depois)</h1>} />
        </Route>

        {/* CATCH-ALL */}
        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </Routes>
    </Router>
  );
};
