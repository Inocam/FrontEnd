import Header from "../components/Header";
import Sidenav from "../components/Sidenav";
import Canbancom from "../components/Canban";

const CanbanB = () => {
  // const [isSign, setisSign] = useState(false);
  return (
    <div>
      <Header />
      <Sidenav>
        <Canbancom></Canbancom>
      </Sidenav>
    </div>
  );
};

export default CanbanB;
