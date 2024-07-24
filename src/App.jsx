import DashBoard from "./pages/DashBoard";
import Header from "./components/Header";
import Sidenav from "./components/Sidenav";
import { GlobalCss } from "./styles/index.style";

const App = () => {
  return (
    <div>
      <GlobalCss />
      <DashBoard />
    </div>
  );
};

export default App;
