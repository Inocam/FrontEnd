import { useState } from "react";
import Sidenav from "../components/Sidenav";
import Header from "../components/Header";
import Calendarcom from "../components/Calender";
import { useEffect } from "react";
import * as S from "../styles/index.style";
import Message from "../components/Messsage";
// Styled components

const Dashboard = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  // const [dayEvents, setDayEvents] = useState([]);
  useEffect(() => {
    console.log(selectedDay);
  }, [selectedDay]);
  const projectProgress = [
    { name: "진행전", progress: 80 },
    { name: "진행중", progress: 60 },
    { name: "완료", progress: 40 },
    { name: "중단", progress: 20 },
  ];

  const handleDayClick = (year, month, day) => {
    setSelectedDay(`${year} - ${month} - ${day}`);
  };

  return (
    <div>
      <Header />
      <Sidenav>
        <S.calender.DashboardContainer>
          <S.calender.CardFlexDiv>
            <S.calender.Card>
              <S.calender.CardHeader>
                <S.calender.CardTitle>일정 캘린더</S.calender.CardTitle>
              </S.calender.CardHeader>
              <S.calender.CardContent>
                <Calendarcom onDayClick={handleDayClick} />
              </S.calender.CardContent>
            </S.calender.Card>
            <S.calender.InfoCard>
              <S.calender.CardHeader>
                <S.calender.CardTitle>일정 상세</S.calender.CardTitle>
              </S.calender.CardHeader>
              <div>
                {task.map((data) => {
                  return (
                    <div key={data.taskID}>
                      <p>title : {data.title}</p>
                      <p>description : {data.description}</p>
                      <p>user : {data.user}</p>
                      <p>status : {data.status}</p>
                      <p>startDate : {data.startDate}</p>
                      <p>dueDate : {data.dueDate}</p>
                      <p>startDate : {data.startDate}</p>
                    </div>
                  );
                })}
              </div>
            </S.calender.InfoCard>
          </S.calender.CardFlexDiv>

          <S.calender.BCard>
            <S.calender.CardHeader>
              <S.calender.CardTitle>
                이번달 프로젝트 진행상황
              </S.calender.CardTitle>
            </S.calender.CardHeader>
            <S.calender.CardContent>
              {projectProgress.map((project, index) => (
                <S.calender.ProgressContainer key={index}>
                  <S.calender.ProgressLabel>
                    <span>{project.name}</span>
                    <span>{project.progress}%</span>
                  </S.calender.ProgressLabel>
                  <S.calender.ProgressBar>
                    <S.calender.ProgressFill $progress={project.progress} />
                  </S.calender.ProgressBar>
                </S.calender.ProgressContainer>
              ))}
            </S.calender.CardContent>
          </S.calender.BCard>
        </S.calender.DashboardContainer>
      </Sidenav>
        <Message />
    </div>
  );
};

export default Dashboard;

const task = [
  {
    taskID: "1",
    title: "프로젝트 계획 수립",
    description: "연간 마케팅 전략 프로젝트의 전체 계획 수립",
    user: "user123",
    status: "in-progress",
    startDate: "2024-08-01",
    dueDate: "2024-08-15",
    parentTask: null,
    childTask: "2",
  },
  {
    taskID: "2",
    title: "시장 조사 실시",
    description: "주요 경쟁사 및 시장 트렌드 분석",
    user: "user456",
    status: "todo",
    startDate: "2024-08-16",
    dueDate: "2024-09-15",
    parentTask: "1",
    childTask: "3",
  },
  {
    taskID: "3",
    title: "마케팅 전략 초안 작성",
    description: "조사 결과를 바탕으로 초기 마케팅 전략 문서 작성",
    user: "user789",
    status: "todo",
    startDate: "2024-09-16",
    dueDate: "2024-10-15",
    parentTask: "2",
    childTask: "4",
  },
  {
    taskID: "4",
    title: "예산 책정",
    description: "마케팅 전략 실행을 위한 예산 항목 설정 및 금액 책정",
    user: "user101",
    status: "todo",
    startDate: "2024-10-16",
    dueDate: "2024-11-15",
    parentTask: "3",
    childTask: "5",
  },
  {
    taskID: "5",
    title: "최종 보고서 작성",
    description: "연간 마케팅 전략에 대한 최종 보고서 작성 및 검토",
    user: "user202",
    status: "todo",
    startDate: "2024-11-16",
    dueDate: "2024-12-15",
    parentTask: "4",
    childTask: null,
  },
];

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
