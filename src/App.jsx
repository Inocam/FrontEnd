import { BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { GlobalCss } from "./styles/index.style";
import Dashboard from "./pages/Calender";
import CanbanB from "./pages/Canban";
import TeamPage from "./pages/Team";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import AddSchedule from "./components/AddSchedule";
import AccessPage from "./pages/Access";

const Authorization = ({ children }) => {
  const accessToken = Cookies.get("AccessToken");
  if (accessToken) {
    //여기에 acceess 토큰있으면 다시 사용자정보를 받아올 로직만들생각
    //아직 구현안됨
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
        <Route path="/" element={<AccessPage />} />
        <Route
          path="/team"
          element={Authorization(
            <Authorization>
              <TeamPage />
            </Authorization>
          )}
        />
        <Route
          path="/calender"
          element={Authorization(
            <Authorization>
              <Dashboard />
            </Authorization>
          )}
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
          path="/access"
          element={
            <Authorization>
              <AccessPage />
            </Authorization>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
