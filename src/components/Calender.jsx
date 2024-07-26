import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

const Calendarcom = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [TargetDay, setTargetDay] = useState(null);
  const [TargetId, setTargetId] = useState(null);

  const Tdate = {
    Year: currentDate.getFullYear(),
    Month: currentDate.getMonth() + 1,
  };
  useEffect(() => {
    setTargetDay(null);
  }, [currentDate]);

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const startDay = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  //   const prevMonth = () => {
  //     setCurrentDate(
  //       new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
  //     );
  //   };

  //   const nextMonth = () => {
  //     setCurrentDate(
  //       new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
  //     );
  //   };

  const renderCalendar = () => {
    const totalDays = daysInMonth(currentDate);
    const startingDay = startDay(currentDate);
    const blanks = Array(startingDay).fill(null);
    const days = Array.from({ length: totalDays }, (_, i) => i + 1);
    const allDays = [...blanks, ...days];
    return (
      <CalendarGrid>
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <DayHeader key={day}>{day}</DayHeader>
        ))}
        {allDays.map((day, index) => (
          <Day key={index} onClick={() => setTargetDay(day)}>
            {<p>{day}</p>}
          </Day>
        ))}
      </CalendarGrid>
    );
  };
  const selectedTask = task.find((task) => task.taskID === TargetId);
  return (
    <CalendarWrapper>
      <Fdiv>
        <Title>
          {Tdate.Year}년 {Tdate.Month}월
        </Title>
      </Fdiv>
      {renderCalendar()}
      {TargetDay && (
        <div>
          <Fdiv>
            <ResultTitle>
              {Tdate.Month}월 {TargetDay}일
            </ResultTitle>
          </Fdiv>
          <Resultdiv>
            <div>
              {task.map((item) => {
                return (
                  <div
                    key={item.taskID}
                    onClick={() => setTargetId(item.taskID)}
                  >
                    <p>{item.title}</p>
                    <p>{item.status}</p>
                  </div>
                );
              })}
            </div>
            {TargetId && (
              <div>
                <p>title : {selectedTask.description}</p>
                <p>description : {selectedTask.user}</p>
                <p>status : {selectedTask.status}</p>
                <p>startDate : {selectedTask.startDate}</p>
                <p>dueDate : {selectedTask.dueDate}</p>
              </div>
            )}
          </Resultdiv>
        </div>
      )}
    </CalendarWrapper>
  );
};

export default Calendarcom;

const CalendarWrapper = styled.div`
  width: 100%;
  margin: 120px 0px;
  padding: 0px 120px;
  min-width: 1200px;
`;

const Fdiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
`;

const DayHeader = styled.div`
  text-align: center;
  font-weight: bold;
  padding: 0.5rem;
`;

const Day = styled.div`
  text-align: center;
  padding: 0.5rem 2rem;
  border: 1px solid #e5e7eb;
  background-color: red;
  cursor: pointer;
`;

const ResultTitle = styled.div`
  margin-top: 70px;
  font-size: 1rem;
`;
const Resultdiv = styled.div`
  display: flex;
  gap: 30px;
`;

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
