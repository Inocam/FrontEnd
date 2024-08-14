import Message from "../components/Messsage";
import Sidenav from "../components/Sidenav";
import Header from "../components/Header";

import Calenderboard from "../components/Calenderboard";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <Sidenav>
        <Calenderboard />
      </Sidenav>
      <Message />
    </div>
  );
};

export default Dashboard;
