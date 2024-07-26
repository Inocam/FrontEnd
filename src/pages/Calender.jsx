//내부 데이터
import Calendarcom from "../components/Calender";
import Header from "../components/Header";
import Sidenav from "../components/Sidenav";
const Calender = () => {
  return (
    <div>
      <Header />
      <Sidenav>
        <Calendarcom></Calendarcom>
      </Sidenav>
    </div>
  );
};

export default Calender;
