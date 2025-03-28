import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
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
