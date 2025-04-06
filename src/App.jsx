import "./index.css";
import CheckoutPage from "./pages/CheckoutPage"
import RegisterPage from "./pages/RegisterPage";
import {AppointmentManager} from "./pages/AppointmentManager";

function App() {
  return (
    <>
    <div className="w-full flex flex-col items-center justify-center bg-gray-100">
      <AppointmentManager/>
    </div>
      
    </>
  );
}

export default App;
