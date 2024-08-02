import Header from "../components/Header";
import Sidenav from "../components/Sidenav";
import Canboard from "../components/canban";

const CanbanB = () => {
  // const [isSign, setisSign] = useState(false);
  return (
    <div>
      <Header />
      <Sidenav>
        <Canboard></Canboard>
      </Sidenav>
    </div>
  );
};

export default CanbanB;
