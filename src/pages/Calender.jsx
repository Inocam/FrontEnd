import { Suspense } from "react";

import Message from "../components/Messsage";
import Sidenav from "../components/Sidenav";
import Header from "../components/Header";

import Calenderboard from "../components/Calenderboard";
// Styled components

const Dashboard = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <Sidenav>
          <Calenderboard />
        </Sidenav>
        {/* <Message /> */}
      </Suspense>
    </div>
  );
};

export default Dashboard;

// const Modal = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const ModalContent = styled.div`
//   background-color: white;
//   padding: 2rem;
//   border-radius: 0.5rem;
//   max-width: 90%;
//   max-height: 90%;
//   overflow-y: auto;
// `;

{
  /* {selectedDay && (
            <Modal onClick={() => setSelectedDay(null)}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                <h2>{selectedDay}일의 일정</h2>
                {dayEvents.length > 0 ? (
                  <ul>
                    {dayEvents.map((event, index) => (
                      <li key={index}>
                        <strong>{event.time}</strong> - {event.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>이 날에는 예정된 일정이 없습니다.</p>
                )}
              </ModalContent>
            </Modal>
          )} */
}
