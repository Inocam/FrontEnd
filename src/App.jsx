import Header from "./components/Header";
import Sidenav from "./components/Sidenav";
import { GlobalCss } from "./styles/index.style";

const App = () => {
  return (
    <div>
      <GlobalCss />
      <Header />
      <Sidenav />
    </div>
  );
};

export default App;
