import { useEffect, Suspense } from "react";
//내부 컴포넌트
import * as S from "../styles/index.style";
import Message from "../components/Messsage";
import Sidenav from "../components/Sidenav";
import Header from "../components/Header";
import Calendarcom from "../components/Calender";
import { useSelector } from "react-redux";
import {
  useGetTask,
  // useGetTask,
  useGetTaskstatuscount,
} from "../api/task/useTask";
// Styled components

const Calenderboard = () => {
  const date = useSelector((state) => state.Date.date);
  console.log(date);
  const { TaskData } = useGetTask();
  const { TaskStatuscount: statusCount } = useGetTaskstatuscount();
  const values = Object.values(statusCount).reduce((a, b) => {
    return a + b;
  }, 0);
  console.log(TaskData);
  const projectProgress = [
    {
      name: "진행전",
      progress: !isNaN(statusCount["todo"])
        ? ((statusCount["todo"] / values) * 100).toFixed(2)
        : 0,
    },
    {
      name: "진행중",
      progress: !isNaN(statusCount["ongoing"])
        ? ((statusCount["ongoing"] / values) * 100).toFixed(2)
        : 0,
    },
    {
      name: "완료",
      progress: !isNaN(statusCount["done"])
        ? ((statusCount["done"] / values) * 100).toFixed(2)
        : 0,
    },
    {
      name: "중단",
      progress: !isNaN(statusCount["delay"])
        ? ((statusCount["delay"] / values) * 100).toFixed(2)
        : 0,
    },
  ];

  return (
    <S.calender.DashboardContainer style={{ margin: "0 20px" }}>
      <S.calender.CardFlexDiv>
        <S.calender.Card>
          <S.calender.CardHeader>
            <S.calender.CardTitle>일정 캘린더</S.calender.CardTitle>
          </S.calender.CardHeader>
          <S.calender.CardContent>
            <Calendarcom />
          </S.calender.CardContent>
        </S.calender.Card>
        <S.calender.InfoCard>
          <S.calender.CardHeader>
            <S.calender.CardTitle>일정 상세</S.calender.CardTitle>
          </S.calender.CardHeader>
          {TaskData.length != 0 ? (
            <div>
              {TaskData.map((data) => {
                return (
                  <div key={data.taskId}>
                    <p>title : {data.title}</p>
                    <p>description : {data.description}</p>
                    <p>user : {data.user}</p>
                    <p>status : {data.status}</p>
                    <p>startDate : {data.startDate}</p>
                    <p>dueDate : {data.dueDate}</p>
                    <p>endDate : {data.endDate}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>{`${date.year}-${date.month}-${date.day} 일정없음`} </p>
          )}
        </S.calender.InfoCard>
      </S.calender.CardFlexDiv>
      <S.calender.BCard>
        <S.calender.CardHeader>
          <S.calender.CardTitle>이번달 프로젝트 진행상황</S.calender.CardTitle>
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
  );
};

export default Calenderboard;

const projectProgress = [
  { name: "진행전", progress: 80 },
  { name: "진행중", progress: 80 },
  { name: "완료", progress: 80 },
  { name: "중단", progress: 80 },
];

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
