import { BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { GlobalCss } from "./styles/index.style";
import Dashboard from "./pages/Calender";
import CanbanB from "./pages/Canban";
import TeamPage from "./pages/Team";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalCss></GlobalCss>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/calender" element={<Dashboard />} />
        <Route path="/kanban" element={<CanbanB />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
