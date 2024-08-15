import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { GlobalCss } from "./styles/index.style";
import { Navigate } from "react-router-dom";
import Dashboard from "./pages/Calender";
import TeamPage from "./pages/Team";
import Cookies from "js-cookie";
import Login from "./pages/Login";
import AccessPage from "./pages/Access";
import SettingPage from "./pages/Setting";
import { useSelector } from "react-redux";


const Authorization = ({ children }) => {
  const accessToken = Cookies.get("AccessToken");
  if (accessToken) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/"} />;
  }
};
const TeamAuthorization = ({ children }) => {
  const user = useSelector((state) => state.user);
  if (!user.TeamLeader && !user.TeamId) {
    return <Navigate to={"/team"} />;
  }
  return <>{children}</>;
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
              <TeamAuthorization>
                <Dashboard />
              </TeamAuthorization>
            </Authorization>
          }
        />
        <Route
          path="/access"
          element={
            <Authorization>
              <TeamAuthorization>
                <AccessPage />
              </TeamAuthorization>
            </Authorization>
          }
        />
        <Route
          path="/teamsetting"
          element={
            <Authorization>
              <TeamAuthorization>
                <SettingPage />
              </TeamAuthorization>
            </Authorization>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
