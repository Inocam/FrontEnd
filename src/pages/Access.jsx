import Header from "../components/Header";
import Sidenav from "../components/Sidenav";
import Access from "../components/Access";
import { Suspense } from "react";

const AccessPage = () => {
  // const [isSign, setisSign] = useState(false);
  return (
    <div>
      <Header />
      <Sidenav>
        <Access></Access>
      </Sidenav>
    </div>
  );
};

export default AccessPage;
