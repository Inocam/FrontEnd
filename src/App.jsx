import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { GlobalCss } from "./styles/index.style";
import { Navigate } from "react-router-dom";
import Dashboard from "./pages/Calender";
import CanbanB from "./pages/Canban";
import TeamPage from "./pages/Team";
import Cookies from "js-cookie";
import Login from "./pages/Login";
import AccessPage from "./pages/Access";
import SettingPage from "./pages/Setting";

const Authorization = ({ children }) => {
  const accessToken = Cookies.get("AccessToken");
  if (accessToken) {
    console.log("집으로");
    return <>{children}</>;
  } else {
    return <Navigate to={"/"} />;
  }
};

const App = () => {
  return (
    <BrowserRouter>
      <GlobalCss></GlobalCss>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/team"
          element={
            <Authorization>
              <TeamPage />
            </Authorization>
          }
        />
        <Route
          path="/calender"
          element={
            <Authorization>
              <Dashboard />
            </Authorization>
          }
        />
        <Route
          path="/kanban"
          element={
            <Authorization>
              <CanbanB />
            </Authorization>
          }
        />
        <Route
          path="/access"
          element={
            <Authorization>
              <AccessPage />
            </Authorization>
          }
        />
        <Route
          path="/teamsetting"
          element={
            <Authorization>
              <SettingPage />
            </Authorization>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
