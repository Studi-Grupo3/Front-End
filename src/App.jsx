import "./index.css";

import HomePage from "./pages/HomePage";
import { AppRouter } from "./routes/AppRouter";

function App() {
  return (
    <>
      <HomePage/>
      <AppRouter />
    </>
  );
}

export default App;
