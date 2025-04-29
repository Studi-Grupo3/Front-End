import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ClassModelSelection from "./components/appointment-class/ClassModelSelection";
import ChooseProfessor from "./pages/ChooseProfessor";
import HomePage from "./pages/HomePage";
import Scheduling from "./pages/Scheduling.jsx"; 
import Payment from "./pages/Payment";
import ConfirmedPayment from "./pages/ConfirmedPayment";
import ClassDetailsForm from "./components/appointment-class/ClassDetailsForm";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/Class-Details" element={<ClassDetailsForm />} />
        <Route path="/class-model" element={<ClassModelSelection />} />
        <Route path="/choose-professor" element={<ChooseProfessor />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/agendamentos" element={<Scheduling />} />
        <Route path="/pagamento" element={<Payment />} />
        <Route path="/concluido" element={<ConfirmedPayment />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;