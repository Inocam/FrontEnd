import { BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { GlobalCss } from "./styles/index.style";
import Message from "./components/message1";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalCss></GlobalCss>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/massage" element={<Message />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
