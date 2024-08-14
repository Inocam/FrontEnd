import Header from "../components/Header";
import Sidenav from "../components/Sidenav";
import Access from "../components/Access";
import { Suspense } from "react";
import Message from "../components/Messsage";

const AccessPage = () => {
  // const [isSign, setisSign] = useState(false);
  return (
    <div>
      <Header />
      <Sidenav>
        <Access></Access>
      </Sidenav>
      <Message></Message>
    </div>
  );
};

export default AccessPage;
