import { BrowserRouter } from "react-router-dom";
// import Login from "./pages/Login";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
// import Dashboard from "./pages/Calender";
import { GlobalCss } from "./styles/index.style";
import CanbanB from "./pages/Canban"

const App = () => {
  return (
    <BrowserRouter>
      <GlobalCss></GlobalCss>
      <Routes>
        <Route path="/" element={<CanbanB />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
