import { GlobalCss } from "./styles/index.style";
import { BrowserRouter } from "react-router-dom";
import Alert from "./components/Alert";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";


const App = () => {
  return (
    <BrowserRouter>
    <GlobalCss></GlobalCss>
      <Routes>
        <Route path="/" element={<Alert />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
