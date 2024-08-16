import Header from "../components/Header";
import Sidenav from "../components/Sidenav";
import Canbancom from "../components/chart/Canban";
import Message from "../components/Messsage";

const CanbanB = () => {
  // const [isSign, setisSign] = useState(false);
  return (
    <div>
      <Header />
      <Sidenav>
        <Canbancom></Canbancom>
        <Message></Message>
      </Sidenav>
    </div>
  );
};

export default CanbanB;
