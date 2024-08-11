import Header from "../components/Header";
import Sidenav from "../components/Sidenav";
import Setting from "../components/Setting";

const SettingPage = () => {
  // const [isSign, setisSign] = useState(false);
  return (
    <div>
      <Header />
      <Sidenav>
        <Setting></Setting>
      </Sidenav>
    </div>
  );
};

export default SettingPage;
